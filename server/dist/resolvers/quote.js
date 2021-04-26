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
exports.QuoteResolver = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Quote_1 = require("../entities/Quote");
const Like_1 = require("../entities/Like");
const QuoteInput_1 = require("../inputs/QuoteInput");
const isAuth_1 = require("../middleware/isAuth");
let QuoteResolver = class QuoteResolver {
    likeStatus(quote, { req, likeLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId)
                return null;
            const like = yield likeLoader.load({
                quoteId: quote.id,
                userId: req.session.userId
            });
            return (like === null || like === void 0 ? void 0 : like.value) === 1 ? 1 : null;
        });
    }
    hasFavorite(quote, { req, favoriteLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId)
                return null;
            const favorite = yield favoriteLoader.load({
                quoteId: quote.id,
                userId: req.session.userId
            });
            return favorite ? true : false;
        });
    }
    getQuotes(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const quoteLimit = Math.min(50, limit);
            const quoteLimitPlusOne = quoteLimit + 1;
            const qb = typeorm_1.getConnection()
                .getRepository(Quote_1.Quote)
                .createQueryBuilder("q")
                .orderBy('"createdAt"', "ASC")
                .take(quoteLimitPlusOne);
            if (cursor) {
                qb.where('"id" > :cursor', { cursor });
            }
            const quotes = yield qb.getMany();
            return {
                quotes: quotes.slice(0, quoteLimit),
                hasMore: quotes.length === quoteLimitPlusOne
            };
        });
    }
    getQuote(author, country, job, category) {
        return __awaiter(this, void 0, void 0, function* () {
            if (author)
                return Quote_1.Quote.find({ author });
            else if (country)
                return Quote_1.Quote.find({ country });
            else if (job)
                return Quote_1.Quote.find({ job });
            else
                return Quote_1.Quote.find({ category });
        });
    }
    getToptenQuotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const quote = Quote_1.Quote.find({
                order: { likeCount: "DESC" }
            });
            return (yield quote).slice(0, 10);
        });
    }
    searchQuote(searchArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            return Quote_1.Quote.find({
                where: [
                    { author: typeorm_1.Like(`%${searchArgs}%`) },
                    { country: typeorm_1.Like(`%${searchArgs}%`) },
                    { job: typeorm_1.Like(`%${searchArgs}%`) },
                    { text: typeorm_1.Like(`%${searchArgs}%`) }
                ]
            });
        });
    }
    likeQuote(quoteId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLike = value !== -1;
            const realValue = isLike ? 1 : -1;
            const { userId } = req.session;
            const like = yield Like_1.Like.findOne({
                userId: userId,
                quoteId
            });
            if (like && like.value !== realValue) {
                yield typeorm_1.getConnection().transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    yield transaction.query(`
                    delete from likes
                    where "quoteId" = $1 and "userId" = $2
                `, [quoteId, userId]);
                    yield transaction.query(`
                    update quotes
                    set "likeCount" = "likeCount" + $1
                    where id = $2
                `, [realValue, quoteId]);
                }));
            }
            else if (!like) {
                yield typeorm_1.getConnection().transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    yield transaction.query(`
                    insert into likes ("userId", "quoteId", value)
                    values ($1, $2, $3)
                `, [userId, quoteId, realValue]);
                    yield transaction.query(`
                    update quotes
                    set "likeCount" = "likeCount" + $1
                    where id = $2
                `, [realValue, quoteId]);
                }));
            }
            return true;
        });
    }
    createQuote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Quote_1.Quote.create(Object.assign({}, data)).save();
        });
    }
    updateQuote(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const quote = yield Quote_1.Quote.findOne(id);
            if (!quote)
                throw new apollo_server_errors_1.UserInputError('名言が見つかりません！');
            if (typeof quote !== undefined) {
                const updatedQuote = Object.assign(quote, data);
                yield updatedQuote.save();
            }
            ;
            return quote;
        });
    }
    deleteQuote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Quote_1.Quote.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Quote_1.Quote, Object]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "likeStatus", null);
__decorate([
    type_graphql_1.FieldResolver(() => Boolean, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Quote_1.Quote, Object]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "hasFavorite", null);
__decorate([
    type_graphql_1.Query(() => Quote_1.PaginatedQuotes),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('cursor', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "getQuotes", null);
__decorate([
    type_graphql_1.Query(() => [Quote_1.Quote]),
    __param(0, type_graphql_1.Arg('author', () => String, { nullable: true })),
    __param(1, type_graphql_1.Arg('country', () => String, { nullable: true })),
    __param(2, type_graphql_1.Arg('job', () => String, { nullable: true })),
    __param(3, type_graphql_1.Arg('category', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "getQuote", null);
__decorate([
    type_graphql_1.Query(() => [Quote_1.Quote]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "getToptenQuotes", null);
__decorate([
    type_graphql_1.Query(() => [Quote_1.Quote]),
    __param(0, type_graphql_1.Arg('serchArgs', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "searchQuote", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('quoteId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('value', () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "likeQuote", null);
__decorate([
    type_graphql_1.Mutation(() => Quote_1.Quote),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuoteInput_1.CreateQuoteInput]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "createQuote", null);
__decorate([
    type_graphql_1.Mutation(() => Quote_1.Quote),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, QuoteInput_1.UpdateQuoteInput]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "updateQuote", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "deleteQuote", null);
QuoteResolver = __decorate([
    type_graphql_1.Resolver(Quote_1.Quote)
], QuoteResolver);
exports.QuoteResolver = QuoteResolver;
//# sourceMappingURL=quote.js.map