import 'reflect-metadata';
import cors from 'cors';
import express from 'express'
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import http from 'http';
import { ApolloError, ApolloServer, UserInputError } from 'apollo-server-express'
import { ArgumentValidationError, buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { GraphQLError } from 'graphql';

import { HelloResolver } from './resolvers/hello';
import { QuoteResolver } from './resolvers/quote';
import { UserResolver } from './resolvers/user';
import { FavoriteResolver } from './resolvers/favorite';
import { COOKIE_NAME, __prod__ } from './constants';
import { MyContext } from './types';

const main = async () => {
    await createConnection()
        .then(() => console.log('database connect!'));

    const app = express();
    const httpServer = http.createServer(app);

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    app.use(session ({
        name: COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTTL: true,
            disableTouch: true
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
    }));
    
    const apolloServer = new ApolloServer({
        playground: {
            settings: {
                "request.credentials": "include",
            },
        },
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                QuoteResolver,
                UserResolver,
                FavoriteResolver
            ]
        }),
        subscriptions: {
            path: '/subscriptions',
            onConnect: () => console.log('subscription connected!'),
            onDisconnect: () => console.log('subscription disconnected!'),
        },
        formatError: (err: GraphQLError) => {
            if (err.originalError instanceof ApolloError) {
                return err;
            }
            if (err.originalError instanceof ArgumentValidationError) {
                const errorMessage = err.extensions?.exception.validationErrors;
                const object = errorMessage.map((e: {property: string, constraints: string}) => (
                    { [e.property]: Object.values(e.constraints) }
                ));
                const formattedErrors = object.reduce((result: string[], current: string[]) => {
                    let key: any = Object.keys(current);
                    result[key] = current[key];
                    return result;
                }, {});
                throw new UserInputError('Errors', { formattedErrors });
            }

            return err;
        },
        context: ({ req, res }): MyContext => ({ req, res, redis })
    });
    //
    apolloServer.applyMiddleware({ 
        app,
        cors: false 
    });
    apolloServer.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.PORT!, () => {
        console.log('server started on ' + process.env.APP_ADDRESS);
    })
}

main().catch((err) => console.log(err));