import pkg from "pg";
import dotenv from "dotenv";

// get env config
dotenv.config();

export const pool = new pkg.Pool({
  connectionString: `postgresql://postgres:${process.env.POSTGRES_PASS}@localhost:5432/home-monitor`,
});
