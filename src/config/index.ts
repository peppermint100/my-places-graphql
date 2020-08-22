import env from "./env"

env()

export const PORT = process.env.PORT || 4000
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret"