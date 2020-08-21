import { ApolloServer } from "apollo-server-express"
import express from "express"
import cors from "cors"
import PORT from "./config/port"
import "reflect-metadata"
import { createSchema } from "./util/createSchema"
import { dbOptions } from "./config/db"
import { createConnection } from "typeorm"

async function init() {
    await createConnection(dbOptions)

    const schema = await createSchema()
    const apolloServer = new ApolloServer({
        schema
    })

    const app = express()

    app.use(cors())

    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(PORT, () => {
        console.log(`GraphQL Server Started On Port ${PORT}`)
    })
}

init()

