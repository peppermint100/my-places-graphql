import env from "./env"
import { ConnectionOptions } from "typeorm"

env()

export const dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        __dirname + "./../entity/*.ts"
    ],
    synchronize: true,
}