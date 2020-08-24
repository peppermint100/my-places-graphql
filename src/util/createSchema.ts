import { buildSchema } from "type-graphql"
import { RegisterResolver, LoginResolver, SelfResolver } from "../resolvers/user"


export const createSchema = () =>
    buildSchema({
        resolvers: [
            RegisterResolver,
            LoginResolver,
            SelfResolver
        ]
    });
