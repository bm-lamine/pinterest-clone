import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { redis } from "$lib/server/redis";
import { redisStorage } from "@better-auth/redis-storage";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    debugLogs: true,
  }),

  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: "better-auth:",
  }),

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: ({ email, url }) =>
        console.log(`Magic link sent to ${email}: ${url}`),
      storeToken: "hashed",
    }),
    // make sure this is the last plugin in the array
    sveltekitCookies(getRequestEvent),
  ],

  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
});

export type Auth = typeof auth.$Infer.Session;
