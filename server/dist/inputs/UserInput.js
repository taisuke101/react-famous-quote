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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordInput = exports.CreateUserInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const Match_1 = require("../decorators/Match");
const IsUserAlreadyExist_1 = require("../decorators/IsUserAlreadyExist");
const IsEmailALreadyExist_1 = require("../decorators/IsEmailALreadyExist");
let CreateUserInput = class CreateUserInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'ユーザー名は必須項目です！' }),
    class_validator_1.MaxLength(15, { message: '15文字以内に収めて下さい！' }),
    IsUserAlreadyExist_1.IsUserAlreadyExist({ message: '登録済みのユーザーです！' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Eメールは必須項目です！' }),
    class_validator_1.IsEmail({}, { message: '無効なEメールの形式です！' }),
    IsEmailALreadyExist_1.IsEmailAlreadyExist({ message: '登録済みのEメールアドレスです！' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'パスワードは必須項目です！' }),
    class_validator_1.MaxLength(15, { message: '15文字以内に収めて下さい！' }),
    class_validator_1.MinLength(2, { message: '2文字以上に設定して下さい！' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: '確認用パスワードは必須項目です！' }),
    Match_1.Match('password', { message: 'パスワードが一致しません！' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "confirmPassword", void 0);
CreateUserInput = __decorate([
    type_graphql_1.InputType()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let ChangePasswordInput = class ChangePasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: '新しいパスワードは必須項目です！' }),
    class_validator_1.MinLength(2, { message: '2文字以上に設定して下さい！' }),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "newPassword", void 0);
ChangePasswordInput = __decorate([
    type_graphql_1.InputType()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;
//# sourceMappingURL=UserInput.js.map