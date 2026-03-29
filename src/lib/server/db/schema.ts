import { relations } from "drizzle-orm";
import { index, primaryKey, pgTable as table } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const users = table("users", (c) => ({
  id: c.text("id").primaryKey(),
  name: c.text("name").notNull(),
  email: c.text("email").notNull().unique(),
  emailVerified: c.boolean("email_verified").default(false).notNull(),
  image: c.text("image"),
  createdAt: c.timestamp("created_at").defaultNow().notNull(),
  updatedAt: c
    .timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const accounts = table(
  "accounts",
  (c) => ({
    id: c.text("id").primaryKey(),
    accountId: c.text("account_id").notNull(),
    providerId: c.text("provider_id").notNull(),
    userId: c
      .text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: c.text("access_token"),
    refreshToken: c.text("refresh_token"),
    idToken: c.text("id_token"),
    accessTokenExpiresAt: c.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: c.timestamp("refresh_token_expires_at"),
    scope: c.text("scope"),
    password: c.text("password"),
    createdAt: c.timestamp("created_at").defaultNow().notNull(),
    updatedAt: c
      .timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verifications = table(
  "verifications",
  (c) => ({
    id: c.text("id").primaryKey(),
    identifier: c.text("identifier").notNull(),
    value: c.text("value").notNull(),
    expiresAt: c.timestamp("expires_at").notNull(),
    createdAt: c.timestamp("created_at").defaultNow().notNull(),
    updatedAt: c
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const posts = table(
  "posts",
  (c) => ({
    id: c.varchar().$defaultFn(() => nanoid()),
    image: c.varchar().notNull(),
    title: c.varchar().notNull(),
  }),
  (t) => [primaryKey({ columns: [t.id] })],
);
