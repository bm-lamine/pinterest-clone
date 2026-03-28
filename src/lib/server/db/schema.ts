import { pgTableCreator, primaryKey } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const createTable = pgTableCreator((name) => `pinterest_clone_${name}`);

export const posts = createTable(
  "posts",
  (c) => ({
    id: c.varchar().$defaultFn(() => nanoid()),
    image: c.varchar().notNull(),
    title: c.varchar().notNull(),
  }),
  (t) => [primaryKey({ columns: [t.id] })],
);
