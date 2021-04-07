import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export default abstract class Base extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}