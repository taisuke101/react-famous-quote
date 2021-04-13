import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";

import Base from "./Base";
import { Favorite } from "./Favorite";

@ObjectType()
@Entity('quotes')
export class Quote extends Base {
    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    country: string;

    @Field()
    @Column()
    job: string;

    @Field()
    @Column()
    text: string;

    @Field(() => Favorite)
    @OneToMany(() => Favorite, favorite => favorite.quote)
    favorits: Favorite[];
}

@ObjectType()
export class PaginatedQuotes {
    @Field(() => [Quote])
    quotes: Quote[];
    @Field()
    hasMore: boolean;
}