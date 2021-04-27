import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn,
	Unique,
} from 'typeorm';

import { Quote } from './Quote';
import { User } from './User';

@Entity('likes')
@Unique(['userId', 'quoteId'])
export class Like extends BaseEntity {
	@Column()
	value: number;

	@PrimaryColumn()
	userId: number;

	@PrimaryColumn()
	quoteId: number;

	@ManyToOne(() => User, (user) => user.likes)
	user: User;

	@ManyToOne(() => Quote, (quote) => quote.likes)
	quote: Quote;
}
