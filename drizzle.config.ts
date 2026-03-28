import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export default defineConfig({
  out: "./out/migrations",
  schema: "./src/lib/server/db/schema.ts",
  dbCredentials: { url: process.env.DATABASE_URL },
  dialect: "postgresql",
  verbose: true,
  strict: true,
});
