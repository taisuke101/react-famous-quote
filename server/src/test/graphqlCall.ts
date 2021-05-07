import { graphql, GraphQLSchema } from 'graphql';
import { buildSchema, Maybe } from 'type-graphql';

import { FavoriteResolver } from '../resolvers/favorite';
import { HelloResolver } from '../resolvers/hello';
import { QuoteResolver } from '../resolvers/quote';
import { UserResolver } from '../resolvers/user';

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: any;
	}>;
	userId?: number;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({
	source,
	variableValues,
	userId,
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
		},
	});
};
