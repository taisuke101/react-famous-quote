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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedQuotes = exports.Quote = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Base_1 = __importDefault(require("./Base"));
const Favorite_1 = require("./Favorite");
const Like_1 = require("./Like");
let Quote = class Quote extends Base_1.default {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Quote.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Quote.prototype, "country", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Quote.prototype, "job", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Quote.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Quote.prototype, "likeCount", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Quote.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(() => Favorite_1.Favorite, favorite => favorite.quote),
    __metadata("design:type", Array)
], Quote.prototype, "favorits", void 0);
__decorate([
    typeorm_1.OneToMany(() => Like_1.Like, like => like.quote),
    __metadata("design:type", Array)
], Quote.prototype, "likes", void 0);
Quote = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('quotes')
], Quote);
exports.Quote = Quote;
let PaginatedQuotes = class PaginatedQuotes {
};
__decorate([
    type_graphql_1.Field(() => [Quote]),
    __metadata("design:type", Array)
], PaginatedQuotes.prototype, "quotes", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedQuotes.prototype, "hasMore", void 0);
PaginatedQuotes = __decorate([
    type_graphql_1.ObjectType()
], PaginatedQuotes);
exports.PaginatedQuotes = PaginatedQuotes;
//# sourceMappingURL=Quote.js.map