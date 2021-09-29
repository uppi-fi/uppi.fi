import { Pool } from "pg";

export const db = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/laturi",
});
