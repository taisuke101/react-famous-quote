import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { Match } from '../decorators/Match';
import { IsUserAlreadyExist } from '../decorators/IsUserAlreadyExist';
import { IsEmailAlreadyExist } from '../decorators/IsEmailALreadyExist';

@InputType()
export class CreateUserInput {
	@Field()
	@IsNotEmpty({ message: 'ユーザー名は必須項目です!' })
	@MaxLength(15, { message: '15文字以内に収めて下さい!' })
	@IsUserAlreadyExist({ message: '登録済みのユーザーです!' })
	username: string;

	@Field()
	@IsNotEmpty({ message: 'Eメールは必須項目です!' })
	@IsEmail({}, { message: '無効なEメールの形式です!' })
	@IsEmailAlreadyExist({ message: '登録済みのEメールアドレスです!' })
	email: string;

	@Field()
	@IsNotEmpty({ message: 'パスワードは必須項目です!' })
	@MaxLength(15, { message: '15文字以内に収めて下さい!' })
	@MinLength(2, { message: '2文字以上に設定して下さい!' })
	password: string;

	@Field()
	@IsNotEmpty({ message: '確認用パスワードは必須項目です!' })
	@Match('password', { message: 'パスワードが一致しません!' })
	confirmPassword: string;
}

@InputType()
export class ChangePasswordInput {
	@Field()
	@IsNotEmpty({ message: '新しいパスワードは必須項目です!' })
	@MinLength(2, { message: '2文字以上に設定して下さい!' })
	newPassword: string;
}
