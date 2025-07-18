import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config({
    path: ".dev.vars"
});

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
