INSERT INTO notebooks (name)
VALUES ('SQL Returning')
RETURNING id, name, created_at;

INSERT INTO notes (notebook_id, title, body)
SELECT id, 'First persisted note', 'Created with INSERT RETURNING'
FROM notebooks
WHERE name = 'SQL Returning'
RETURNING id, notebook_id, title, body, status, created_at;

UPDATE notes
SET status = 'ARCHIVED', updated_at = now()
WHERE title = 'First persisted note'
RETURNING id, title, status, updated_at;

DELETE FROM notes
WHERE title = 'First persisted note'
RETURNING id, title;
