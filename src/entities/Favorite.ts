import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import Base from "./Base";
import { Quote } from "./Quote";
import { User } from "./User";

@ObjectType()
@Entity('favorits')
export class Favorite extends Base {
    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    quoteId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.favorits)
    @JoinColumn({ name: 'user'})
    user: User;

    @Field(() => Quote)
    @ManyToOne(() => Quote, quote => quote.favorits)
    @JoinColumn({ name: 'quote'})
    quote: Quote;
}