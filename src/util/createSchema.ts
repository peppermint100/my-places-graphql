import { buildSchema } from "type-graphql"
import { RegisterResolver } from "../resolvers/user"


export const createSchema = () =>
    buildSchema({
        resolvers: [
            RegisterResolver,
        ]
    });
