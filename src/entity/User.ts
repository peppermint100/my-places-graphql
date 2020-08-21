import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    userId: number;

    @Field()
    @Column()
    username: string;


    @Field()
    @Column()
    email: string;

    @Column()
    password: number;
    // places
}
