import { ApolloServer } from "apollo-server-express"
import express from "express"
import cors from "cors"
import { PORT, SESSION_SECRET } from "./config"
import "reflect-metadata"
import { createSchema } from "./util/createSchema"
import { dbOptions } from "./config/db"
import { createConnection } from "typeorm"
import connectRedis from "connect-redis"
import session from "express-session"
import { redis } from "./util/redis"

async function init() {
    await createConnection(dbOptions)

    const schema = await createSchema()
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    })

    const app = express()

    const RedisStore = connectRedis(session)

    app.use(express.json())
    app.use(session({
        store: new RedisStore({
            client: redis
        }),
        name: "qid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            // httpOnly: true,
            secure: false, // if truthy, only excepts https
            maxAge: 1000 * 60 * 5
        }
    }))

    app.use(cors({
        credentials: true,
        origin: process.env.CLIENT || "http://localhost:3000",
    }))

    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(PORT, () => {
        console.log(`GraphQL Server Started On Port ${PORT}`)
    })
}

init()

