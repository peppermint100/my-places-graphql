import { buildSchema } from "type-graphql"
import { RegisterResolver, LoginResolver, LogoutResolver, SelfResolver } from "../resolvers/user"
import {  PlaceResolver } from "./../resolvers/place"


export const createSchema = () =>
    buildSchema({
        resolvers: [
            RegisterResolver,
            LoginResolver,
            SelfResolver,
            LogoutResolver,
            PlaceResolver
        ]
    });
