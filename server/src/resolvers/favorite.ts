import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserInputError } from "apollo-server-errors";

import { Quote } from "../entities/Quote";
import { Favorite } from "../entities/Favorite";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";

@Resolver()
export class FavoriteResolver {

    @UseMiddleware(isAuth)
    @Query(() => [Favorite])
    async getFavorits(
        @Ctx() {req}: MyContext
    ): Promise<Favorite[]> {
        return Favorite.find({
            where: { userId: req.session.userId },
            relations: ['user', 'quote'] 
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => Favorite)
    async getFavorite(
        @Ctx() { req }: MyContext
    ): Promise<Favorite | undefined> {
        return Favorite.findOne(
            req.session.userId, 
            {relations: ['user', 'quote']}
        );
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Favorite)
    async createFavorite(
        @Arg('quoteId', () => Int) quoteId: number,
        @Ctx() { req }: MyContext
    ): Promise<Favorite> {
        const { userId } = req.session;
        const user = await User.findOne(userId);
        if (!user)
            throw new UserInputError('ユーザーが見つかりません！');
        
        const quote = await Quote.findOne(quoteId);
        if (!quote)
            throw new UserInputError('名言が見つかりません！');

        const favorite = await Favorite.create({
            userId: userId as number,
            quoteId,
            user: user,
            quote: quote
        }).save();

        console.log(favorite);
        
        return favorite;
    }

    @Mutation(() => Favorite)
    async deleteFavorite(
        @Arg('favoriteId') favoriteId: number,
    ): Promise<boolean> {
        await Favorite.delete({id: favoriteId});
        return true;
    }
}