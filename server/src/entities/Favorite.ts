import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	Unique,
} from 'typeorm';

import { Quote } from './Quote';
import { User } from './User';

@ObjectType()
@Entity('favorits')
@Unique(['userId', 'quoteId'])
export class Favorite extends BaseEntity {
	@Field(() => Int)
	@PrimaryColumn()
	userId: number;

	@Field(() => Int)
	@PrimaryColumn()
	quoteId: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.favorits)
	@JoinColumn({ name: 'user' })
	user: User;

	@Field(() => Quote)
	@ManyToOne(() => Quote, (quote) => quote.favorits)
	@JoinColumn({ name: 'quote' })
	quote: Quote;
}
