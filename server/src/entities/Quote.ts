import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";

import Base from "./Base";
import { Favorite } from "./Favorite";
import { Like } from './Like'

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

    @Field()
    @Column({ default: 0 })
    likeCount: number;

    @OneToMany(() => Favorite, favorite => favorite.quote)
    favorits: Favorite[];

    @OneToMany(() => Like, like => like.quote)
    likes: Like[];
}

@ObjectType()
export class PaginatedQuotes {
    @Field(() => [Quote])
    quotes: Quote[];
    @Field()
    hasMore: boolean;
}