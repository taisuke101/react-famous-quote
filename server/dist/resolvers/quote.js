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
const QuoteInput_1 = require("../inputs/QuoteInput");
let QuoteResolver = class QuoteResolver {
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
    getQuote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Quote_1.Quote.findOne(id);
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
    type_graphql_1.Query(() => Quote_1.PaginatedQuotes),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('cursor', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "getQuotes", null);
__decorate([
    type_graphql_1.Query(() => Quote_1.Quote),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuoteResolver.prototype, "getQuote", null);
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
    type_graphql_1.Resolver()
], QuoteResolver);
exports.QuoteResolver = QuoteResolver;
//# sourceMappingURL=quote.js.map