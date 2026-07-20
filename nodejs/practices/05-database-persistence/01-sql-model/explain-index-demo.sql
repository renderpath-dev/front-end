EXPLAIN
SELECT id, title, status
FROM notes
WHERE notebook_id = '00000000-0000-0000-0000-000000000000'
ORDER BY created_at DESC;

CREATE INDEX IF NOT EXISTS notes_notebook_created_at_idx
ON notes(notebook_id, created_at DESC);

EXPLAIN
SELECT id, title, status
FROM notes
WHERE notebook_id = '00000000-0000-0000-0000-000000000000'
ORDER BY created_at DESC;
