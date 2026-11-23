import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "../db/schema";
import * as authSchema from "../db/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: { ...schema, ...authSchema }
    }),
    emailAndPassword: {
        enabled: true,
        disableSignUp: true,
        minPasswordLength: 8
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },
    plugins: [nextCookies()],
    rateLimit: {
        storage: "database",
    },
})