import { InputType, Field } from "type-graphql";
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SavePlaceRequest {
    @Field()
    @IsNotEmpty({message: "Place name is Empty"})
    placeName: string

    @Field()
    @IsNotEmpty({message: "Address is Empty"})
    address: string

    @Field()
    @IsNotEmpty({message: "Latitude is Empty"})
    lat: number

    @Field()
    @IsNotEmpty({message: "Longitude is Empty"})
    lng: number

    @Field()
    @IsNotEmpty({message: "User is Empty"})
    userId: number
}
