import { graphql, GraphQLSchema } from 'graphql';
import { buildSchema, Maybe } from 'type-graphql';
import { Redis } from 'ioredis';

import { FavoriteResolver } from '../resolvers/favorite';
import { HelloResolver } from '../resolvers/hello';
import { QuoteResolver } from '../resolvers/quote';
import { UserResolver } from '../resolvers/user';
import { createLikeLoader } from '../utils/createLikeLoader';
import { createFavoriteLoader } from '../utils/createFavoriteLoader';

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: any;
	}>;
	userId?: number;
	redis?: Redis;
	likeLoader?: ReturnType<typeof createLikeLoader>;
	favoriteLoader?: ReturnType<typeof createFavoriteLoader>;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({
	source,
	variableValues,
	userId,
	redis,
	likeLoader,
	favoriteLoader,
}: Options) => {
	if (!schema) {
		schema = await buildSchema({
			resolvers: [HelloResolver, QuoteResolver, UserResolver, FavoriteResolver],
		});
	}
	return graphql({
		schema,
		source,
		variableValues,
		contextValue: {
			req: {
				session: {
					userId,
				},
			},
			res: {
				clearCookie: jest.fn(),
			},
			redis,
			likeLoader,
			favoriteLoader,
		},
	});
};
