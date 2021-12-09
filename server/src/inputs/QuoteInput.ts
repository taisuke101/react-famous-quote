import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateQuoteInput {
	@Field()
	@IsNotEmpty({ message: '発言者は必須項目です!' })
	author: string;

	@Field()
	@IsNotEmpty({ message: '出身国は必須項目です!' })
	country: string;

	@Field()
	@IsNotEmpty({ message: '職業は必須項目です!' })
	job: string;

	@Field()
	@IsNotEmpty({ message: '本文は必須項目です!' })
	text: string;
}

@InputType()
export class UpdateQuoteInput {
	@Field({ nullable: true })
	author?: string;

	@Field({ nullable: true })
	country?: string;

	@Field({ nullable: true })
	job?: string;

	@Field({ nullable: true })
	text?: string;
}
