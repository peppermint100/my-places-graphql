import { Resolver, Mutation, Arg } from "type-graphql";
import { Place } from "./../../entity/Place"
import { SavePlaceRequest } from './PlaceRequest';
import db from "./../../db"

@Resolver()
export class PlaceResolver {
    @Mutation(() => Place || null, { nullable: true })
    async save(@Arg("data") 
    {
        placeName,
        address,
        lat,
        lng,
        userId
    }: SavePlaceRequest
    ) {
    db.then( async () => {
        const place = await Place.create({ placeName, address, lat, lng, userId}).save()
        console.log(place)
        return place
        })
    }

    @Mutation(() => Boolean, { nullable :true }) 
    async delete(@Arg("placeId") placeId: number){
        try{
            await Place.delete({ placeId })
            return true
        }
        catch(err){
            if(err){
                console.log("delete err : ", err)
                return false
            }
        }
        return false
    }
}   