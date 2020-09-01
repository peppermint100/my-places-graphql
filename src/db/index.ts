import "reflect-metadata";
import { createConnection } from 'typeorm';
import { dbOptions } from "./../config/db"


export default createConnection(dbOptions)