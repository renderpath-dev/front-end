import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({ connectionString });

try {
  const result = await pool.query("SELECT NOW() AS now");
  console.log({
    rowCount: result.rowCount,
    now: result.rows[0]?.now
  });
} finally {
  await pool.end();
}
