import { IsNotEmpty, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

import { Match } from "../decorators/Match";
import { IsUserAlreadyExist, IsEmailAlreadyExist } from "../decorators/AlreadyExist";

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty({ message: 'ユーザー名は必須項目です！' })
    @MaxLength(15, { message: '15文字以内に収めて下さい！' })
    @IsUserAlreadyExist({ message: '登録済みのユーザーです！' })
    username: string;

    @Field()
    @IsNotEmpty({ message: 'Eメールは必須項目です！' })
    @IsEmailAlreadyExist({ message: '登録済みのEメールアドレスです！' })
    email: string;

    @Field()
    @IsNotEmpty({ message: 'パスワードは必須項目です！' })
    @MaxLength(15, { message: '15文字以内に収めて下さい！' })
    password: string;

    @Field()
    @IsNotEmpty({ message: '確認用パスワードは必須項目です！' })
    @Match('password', { message: 'パスワードが一致しません！' })
    confirmPassword: string;
}