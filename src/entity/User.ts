import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Place } from "./Place"

@ObjectType()
@Entity("users")
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
    password: string;

    @Field(()=>[Place], { nullable: true})
    @OneToMany(() => Place, (place:Place) => place.user, { eager: true})
    places: Place[];
}
