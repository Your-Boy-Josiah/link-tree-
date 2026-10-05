import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./Backend/drizzle",
  schema: "./Backend/db/schema.ts",
  dialect: "sqlite",
});
