import { buildSchema } from "type-graphql"
import { RegisterResolver, LoginResolver, LogoutResolver, SelfResolver } from "../resolvers/user"


export const createSchema = () =>
    buildSchema({
        resolvers: [
            RegisterResolver,
            LoginResolver,
            SelfResolver,
            LogoutResolver
        ]
    });
