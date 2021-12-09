import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { UserInputError } from 'apollo-server-errors';

import { Quote } from '../entities/Quote';
import { Favorite } from '../entities/Favorite';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from 'src/types';

@Resolver()
export class FavoriteResolver {
	@UseMiddleware(isAuth)
	@Query(() => [Favorite])
	async getFavorits(@Ctx() { req }: MyContext): Promise<Favorite[]> {
		return Favorite.find({
			where: { userId: req.session.userId },
			relations: ['quote'],
		});
	}

	@UseMiddleware(isAuth)
	@Query(() => Favorite)
	async getFavorite(
		@Arg('quoteId', () => Int) quoteId: number,
		@Ctx() { req }: MyContext
	): Promise<Favorite | undefined> {
		const userId = req.session.userId;

		return Favorite.findOne({ userId, quoteId }, { relations: ['quote'] });
	}

	@UseMiddleware(isAuth)
	@Mutation(() => Boolean)
	async createFavorite(
		@Arg('quoteId', () => Int) quoteId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		const { userId } = req.session;
		const user = await User.findOne(userId);
		if (!user)
			throw new UserInputError('errors', {
				formattedErrors: { userId: 'ユーザーが見つかりません!' },
			});

		const quote = await Quote.findOne(quoteId);

		if (quote) {
			const favorite = await Favorite.findOne({
				userId: userId,
				quoteId,
			});
			if (favorite) {
				Favorite.delete({
					userId: userId,
					quoteId,
				});
			} else {
				Favorite.create({
					userId: userId,
					quoteId,
					user: user,
					quote: quote,
				}).save();
			}
			return true;
		} else {
			throw new UserInputError('errors', {
				formattedErrors: { quoteId: '名言が見つかりません!' },
			});
		}
	}
}
