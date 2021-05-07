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
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlCall = void 0;
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const favorite_1 = require("../resolvers/favorite");
const hello_1 = require("../resolvers/hello");
const quote_1 = require("../resolvers/quote");
const user_1 = require("../resolvers/user");
const graphqlCall = ({ source, variableValues }) => __awaiter(void 0, void 0, void 0, function* () {
    return graphql_1.graphql({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, quote_1.QuoteResolver, user_1.UserResolver, favorite_1.FavoriteResolver],
        }),
        source,
        variableValues,
    });
});
exports.graphqlCall = graphqlCall;
//# sourceMappingURL=graphqlCall.js.map