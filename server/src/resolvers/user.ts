import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';

import { User } from "../entities/User";
import { CreateUserInput } from "../inputs/UserInput";
import { MyContext } from "../types";
import { COOKIE_NAME } from "../constants";

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
        @Arg('data') data: CreateUserInput,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        const { username, email, password } = data;

        const emailIsTaken = await User.findOne({email});
        if (emailIsTaken)
            throw new UserInputError('登録済みのEメールです！');

        const user = await User.create({
            username,
            email,
            password,
        }).save();

        req.session.userId = user.id;

        return user;
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
            throw new UserInputError('ユーザーが見つかりません！');
        
        const valid = await argon2.verify(user.password, password);
        if (!valid)
            throw new UserInputError('登録情報と一致しません！');

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

    // @Mutation(() => Boolean)
    // async forgotPassword(
    //     @Arg('email') email: string,
    //     @Ctx() { redis }: MyContext
    // ) {
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //         return true
    //     };

    //     const token = v4();

    //     await redis.set(
    //         FORGET_PASSWORD_PREFIX + token,
    //         user.id,
    //         'ex',
    //         1000 * 60 * 60 * 24 * 3
    //     );

    //     await sendEmail(
    //         email,

    //     )
    // }
}