import { buildSchema } from "type-graphql"
import { RegisterResolver, LoginResolver } from "../resolvers/user"


export const createSchema = () =>
    buildSchema({
        resolvers: [
            RegisterResolver,
            LoginResolver
        ]
    });
