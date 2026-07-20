INSERT INTO notebooks (name) VALUES ('Learning');

INSERT INTO notebooks (name) VALUES (NULL);

INSERT INTO notebooks (name) VALUES ('Learning');

INSERT INTO notes (notebook_id, title, status)
VALUES ('00000000-0000-0000-0000-000000000000', 'Missing notebook', 'ACTIVE');

INSERT INTO notes (notebook_id, title, status)
SELECT id, 'Invalid status', 'DONE'
FROM notebooks
WHERE name = 'Learning';
