import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import {
	getComplexity,
	simpleEstimator,
	fieldExtensionsEstimator,
} from 'graphql-query-complexity';
import helmet from 'helmet';
import ratelimit from 'express-rate-limit';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {
	ApolloError,
	ApolloServer,
	UserInputError,
} from 'apollo-server-express';
import { ArgumentValidationError, buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { GraphQLError } from 'graphql';

import { HelloResolver } from './resolvers/hello';
import { QuoteResolver } from './resolvers/quote';
import { UserResolver } from './resolvers/user';
import { FavoriteResolver } from './resolvers/favorite';
import { COOKIE_NAME, __prod__ } from './constants';
import { MyContext } from './types';
import { createLikeLoader } from './utils/createLikeLoader';
import { createFavoriteLoader } from './utils/createFavoriteLoader';
import { httpsRedirect, wwwRedirect } from './utils/httpsRedirect';

const main = async () => {
	await createConnection().then(() => console.log('database connect!'));

	const app = express();

	const RedisStore = connectRedis(session);
	const redis = new Redis();

	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === 'production' ? undefined : false,
		})
	);

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	);

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
				disableTTL: true,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365,
				httpOnly: true,
				sameSite: 'lax',
				secure: __prod__,
			},
			saveUninitialized: false,
			secret: process.env.REDIS_SECRET!,
			resave: false,
		})
	);

	if (process.env.NODE_ENV === 'production') {
		app.use('/*', httpsRedirect());

		app.get('/*', wwwRedirect());

		app.use(
			ratelimit({
				windowMs: 15 * 60 * 1000,
				max: 100,
			})
		);
	}

	const schema = await buildSchema({
		resolvers: [HelloResolver, QuoteResolver, UserResolver, FavoriteResolver],
	});

	const apolloServer = new ApolloServer({
		playground: {
			settings: {
				'request.credentials': 'include',
			},
		},
		schema,
		introspection: process.env.NODE_ENV !== 'production',
		formatError: (err: GraphQLError) => {
			if (err.originalError instanceof ApolloError) {
				return err;
			}
			if (err.originalError instanceof ArgumentValidationError) {
				const errorMessage = err.extensions?.exception.validationErrors;
				const object = errorMessage.map(
					(e: { property: string; constraints: string }) => ({
						[e.property]: Object.values(e.constraints),
					})
				);
				const formattedErrors = object.reduce(
					(result: string[], current: string[]) => {
						let key: any = Object.keys(current);
						result[key] = current[key];
						return result;
					}
				);
				throw new UserInputError('Errors', { formattedErrors });
			}
			return err;
		},
		context: ({ req, res }): MyContext => ({
			req,
			res,
			redis,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		}),
		plugins: [
			{
				requestDidStart: () => ({
					didResolveOperation({ request, document }) {
						const complexity = getComplexity({
							schema,
							operationName: request.operationName,
							query: document,
							variables: request.variables,
							estimators: [
								fieldExtensionsEstimator(),
								simpleEstimator({ defaultComplexity: 1 }),
							],
						});
						if (complexity > 13) {
							throw new Error(
								`クエリが複雑すぎます! ${complexity} は設定された値を超えています！`
							);
						}
						console.log('Used query complexity points:', complexity);
					},
				}),
			},
		],
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(process.env.PORT!, () => {
		console.log('server started on ' + process.env.APP_ADDRESS);
	});
};

main().catch((err) => console.log(err));
