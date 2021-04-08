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
exports.Favorite = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Base_1 = __importDefault(require("./Base"));
const Quote_1 = require("./Quote");
const User_1 = require("./User");
let Favorite = class Favorite extends Base_1.default {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Favorite.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Favorite.prototype, "quoteId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.favorits),
    typeorm_1.JoinColumn({ name: 'user' }),
    __metadata("design:type", User_1.User)
], Favorite.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => Quote_1.Quote),
    typeorm_1.ManyToOne(() => Quote_1.Quote, quote => quote.favorits),
    typeorm_1.JoinColumn({ name: 'quote' }),
    __metadata("design:type", Quote_1.Quote)
], Favorite.prototype, "quote", void 0);
Favorite = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('favorits'),
    typeorm_1.Unique(['userId', 'quoteId'])
], Favorite);
exports.Favorite = Favorite;
//# sourceMappingURL=Favorite.js.map