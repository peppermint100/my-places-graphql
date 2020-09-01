import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity("places")
export class Place extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    placeId: number;

    @Field({nullable : true})
    @Column({ nullable: true})
    placeName: string;   

    @Field({nullable : true})
    @Column({ nullable: true})
    address: string;

    @Field({nullable : true})
    @Column({ nullable: true})
    lat: number;

    @Field({nullable : true})
    @Column({ nullable: true})
    lng: number;

    @Column()
    userId: number;
    @Field(()=>User)
    @ManyToOne(() => User, (user:User) => user.places)
    @JoinColumn({name: "userId"})
    user: User;
}

