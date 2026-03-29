import { env } from "$env/dynamic/private";
import Redis from "ioredis";

export const redis = new Redis(env.REDIS_URL)
  .on("connect", () => console.log("✅ Redis connected"))
  .on("error", (err) => console.error("❌ Redis error:", err));
