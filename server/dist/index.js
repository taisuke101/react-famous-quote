"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const graphql_query_complexity_1 = require("graphql-query-complexity");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const hello_1 = require("./resolvers/hello");
const quote_1 = require("./resolvers/quote");
const user_1 = require("./resolvers/user");
const favorite_1 = require("./resolvers/favorite");
const constants_1 = require("./constants");
const createLikeLoader_1 = require("./utils/createLikeLoader");
const createFavoriteLoader_1 = require("./utils/createFavoriteLoader");
const httpsRedirect_1 = require("./utils/httpsRedirect");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection().then(() => console.log('database connect!'));
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(helmet_1.default({
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }));
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTTL: true,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.REDIS_SECRET,
        resave: false,
    }));
    if (process.env.NODE_ENV === 'production') {
        app.use('/*', httpsRedirect_1.httpsRedirect());
        app.get('/*', httpsRedirect_1.wwwRedirect());
        app.use(express_rate_limit_1.default({
            windowMs: 15 * 60 * 1000,
            max: 100,
        }));
    }
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [hello_1.HelloResolver, quote_1.QuoteResolver, user_1.UserResolver, favorite_1.FavoriteResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        playground: {
            settings: {
                'request.credentials': 'include',
            },
        },
        schema,
        introspection: process.env.NODE_ENV !== 'production',
        formatError: (err) => {
            var _a;
            if (err.originalError instanceof apollo_server_express_1.ApolloError) {
                return err;
            }
            if (err.originalError instanceof type_graphql_1.ArgumentValidationError) {
                const errorMessage = (_a = err.extensions) === null || _a === void 0 ? void 0 : _a.exception.validationErrors;
                const object = errorMessage.map((e) => ({
                    [e.property]: Object.values(e.constraints),
                }));
                const formattedErrors = object.reduce((result, current) => {
                    let key = Object.keys(current);
                    result[key] = current[key];
                    return result;
                });
                throw new apollo_server_express_1.UserInputError('Errors', { formattedErrors });
            }
            return err;
        },
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            likeLoader: createLikeLoader_1.createLikeLoader(),
            favoriteLoader: createFavoriteLoader_1.createFavoriteLoader(),
        }),
        plugins: [
            {
                requestDidStart: () => ({
                    didResolveOperation({ request, document }) {
                        const complexity = graphql_query_complexity_1.getComplexity({
                            schema,
                            operationName: request.operationName,
                            query: document,
                            variables: request.variables,
                            estimators: [
                                graphql_query_complexity_1.fieldExtensionsEstimator(),
                                graphql_query_complexity_1.simpleEstimator({ defaultComplexity: 1 }),
                            ],
                        });
                        if (complexity > 13) {
                            throw new Error(`クエリが複雑すぎます! ${complexity} は設定された値を超えています！`);
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
    app.listen(process.env.PORT, () => {
        console.log('server started on ' + process.env.APP_ADDRESS);
    });
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map