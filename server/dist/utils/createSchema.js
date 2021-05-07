"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const favorite_1 = require("../resolvers/favorite");
const hello_1 = require("../resolvers/hello");
const quote_1 = require("../resolvers/quote");
const user_1 = require("../resolvers/user");
const createSchema = () => {
    type_graphql_1.buildSchema({
        resolvers: [
            hello_1.HelloResolver,
            quote_1.QuoteResolver,
            user_1.UserResolver,
            favorite_1.FavoriteResolver
        ],
    }),
    ;
};
exports.createSchema = createSchema;
//# sourceMappingURL=createSchema.js.map