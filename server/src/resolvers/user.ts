import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from "type-graphql";
import argon2 from 'argon2';
import { v4 } from "uuid";

import { User } from "../entities/User";
import { ChangePasswordInput, CreateUserInput } from "../inputs/UserInput";
import { MyContext } from "../types";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    getMe(@Ctx() { req }: MyContext): Promise<User | undefined> | null {
        if (!req.session.userId) {
            return null;
        };

        return User.findOne(req.session.userId);
    }

    @Mutation(() => User)
    async createUser(
        @PubSub('CREATE_USER') publish: Publisher<User>,
        @Arg('data') data: CreateUserInput,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        const { username, email, password } = data;

        const emailIsTaken = await User.findOne({email});
        if (emailIsTaken)
            throw new UserInputError('errors', 
            {formattedErrors: {email: '登録済みのEメールです！'}});

        const user = await User.create({
            username,
            email,
            password,
        }).save();

        const payload = user;
    
        await publish(payload);

        req.session.userId = user.id;

        return user;
    }

    @Subscription({ topics: 'CREATE_USER'})
    createUserReceived(@Root() root: User): User {
        return root;
    }

    @Mutation(() => User)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        const user = await User.findOne(
            usernameOrEmail.includes('@')
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail }
        );
        if (!user)
            throw new UserInputError('errors',
            {formattedErrors: {usernameOrEmail: 'ユーザーが見つかりません！'}});
        
        const valid = await argon2.verify(user.password, password);
        if (!valid)
            throw new UserInputError('errors', 
            {formattedErrors: {password: '登録情報と一致しません！'}});

        req.session.userId = user.id;

        return user;    
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res}: MyContext): Promise<boolean> {
        return new Promise(resolve => req.session.destroy(err => {
            res.clearCookie(COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false)
                return
            }
            resolve(true);
        }))
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext
    ) {
        const user = await User.findOne({ email });
        if (!user) {
            return true
        };

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 60 * 60 * 24 * 3
        );

        await sendEmail(
            email,
            `
            <h1>パスワードのリセット</h1>
            <span>パスワードのリセットを受け付けました。
            以下のリンクをクリックして新しいパスワードを設定して下さい。</span>
            <a href="http://localhost:3000/change-password/${token}">
            パスワードのリセット
            </a>
            `
        );

        return true;
    }

    @Mutation(() => User)
    async changePassword(
        @Arg('token') token: string,
        @Arg('data') data: ChangePasswordInput,
        @Ctx() { redis, req }: MyContext
    ): Promise<User> {
        const key = FORGET_PASSWORD_PREFIX + token;

        const userId = await redis.get(key);
        if (!userId)
            throw new UserInputError('errors', 
            {formattedErrors: {token: '期限切れのトークンです！'}});

        const numberUserId = parseInt(userId);

        const user = await User.findOne(numberUserId);
        if(!user)
            throw new UserInputError('errors',
            {formattedErrors: {userId: 'ユーザーが存在しません！'}});
        
        await User.update(
            { id: numberUserId },
            { password: await argon2.hash(data.newPassword) }
        );

        await redis.del(key);

        req.session.userId =  parseInt(userId);

        return user;
    }
}