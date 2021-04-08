"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.FavoriteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const apollo_server_errors_1 = require("apollo-server-errors");
const Quote_1 = require("../entities/Quote");
const Favorite_1 = require("../entities/Favorite");
const User_1 = require("../entities/User");
const isAuth_1 = require("../middleware/isAuth");
let FavoriteResolver = class FavoriteResolver {
    getFavorits({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Favorite_1.Favorite.find({
                where: { userId: req.session.userId },
                relations: ['user', 'quote']
            });
        });
    }
    getFavorite({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Favorite_1.Favorite.findOne(req.session.userId, { relations: ['user', 'quote'] });
        });
    }
    createFavorite(quoteId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const user = yield User_1.User.findOne(userId);
            if (!user)
                throw new apollo_server_errors_1.UserInputError('ユーザーが見つかりません！');
            const quote = yield Quote_1.Quote.findOne(quoteId);
            if (!quote)
                throw new apollo_server_errors_1.UserInputError('名言が見つかりません！');
            const favorite = yield Favorite_1.Favorite.create({
                userId: userId,
                quoteId,
                user: user,
                quote: quote
            }).save();
            return favorite;
        });
    }
    deleteFavorite(favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Favorite_1.Favorite.delete({ id: favoriteId });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Favorite_1.Favorite]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "getFavorits", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => Favorite_1.Favorite),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "getFavorite", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Favorite_1.Favorite),
    __param(0, type_graphql_1.Arg('quoteId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "createFavorite", null);
__decorate([
    type_graphql_1.Mutation(() => Favorite_1.Favorite),
    __param(0, type_graphql_1.Arg('favoriteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "deleteFavorite", null);
FavoriteResolver = __decorate([
    type_graphql_1.Resolver()
], FavoriteResolver);
exports.FavoriteResolver = FavoriteResolver;
//# sourceMappingURL=favorite.js.map