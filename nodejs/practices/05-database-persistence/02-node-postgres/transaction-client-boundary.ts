import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({ connectionString });
const client = await pool.connect();

try {
  await client.query("BEGIN");

  const notebookResult = await client.query(
    "INSERT INTO notebooks (name) VALUES ($1) RETURNING id",
    ["Transaction Notebook"]
  );

  const notebookId = notebookResult.rows[0]?.id;

  await client.query(
    "INSERT INTO notes (notebook_id, title, body) VALUES ($1, $2, $3)",
    [notebookId, "Transaction note", "Created on the same checked-out client"]
  );

  await client.query("COMMIT");
  console.log({ committed: true, notebookId });
} catch (error) {
  await client.query("ROLLBACK");
  console.error(error);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
