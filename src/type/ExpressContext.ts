import { Request } from "express"

export interface ExpressContext {
    req: Request
}