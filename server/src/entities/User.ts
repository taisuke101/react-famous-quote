import { Field, ObjectType } from "type-graphql";
import { BeforeInsert, Column, Entity } from "typeorm";
import argon2 from 'argon2';

import Base from "./Base";

@ObjectType()
@Entity('users')
export class User extends Base {
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
}