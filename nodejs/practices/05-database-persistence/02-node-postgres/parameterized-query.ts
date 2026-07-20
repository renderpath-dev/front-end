import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({ connectionString });

const notebookName = process.argv[2] ?? "Parameterized Notebook";

try {
  const result = await pool.query(
    "INSERT INTO notebooks (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET updated_at = now() RETURNING id, name",
    [notebookName]
  );

  console.log(result.rows[0]);
} finally {
  await pool.end();
}
