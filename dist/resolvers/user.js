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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("../entities/User");
const UserInput_1 = require("../inputs/UserInput");
const constants_1 = require("../constants");
let UserResolver = class UserResolver {
    getMe({ req }) {
        if (!req.session.userId) {
            return null;
        }
        ;
        return User_1.User.findOne(req.session.userId);
    }
    createUser(data, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = data;
            const emailIsTaken = yield User_1.User.findOne({ email });
            if (emailIsTaken)
                throw new apollo_server_errors_1.UserInputError('登録済みのEメールです！');
            const user = yield User_1.User.create({
                username,
                email,
                password,
            }).save();
            req.session.userId = user.id;
            return user;
        });
    }
    login(usernameOrEmail, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(usernameOrEmail.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail });
            if (!user)
                throw new apollo_server_errors_1.UserInputError('ユーザーが見つかりません！');
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid)
                throw new apollo_server_errors_1.UserInputError('登録情報と一致しません！');
            req.session.userId = user.id;
            return user;
        });
    }
    logout({ req, res }) {
        return new Promise(resolve => req.session.destroy(err => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserResolver.prototype, "getMe", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('data')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.CreateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg('usernameOrEmail')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map