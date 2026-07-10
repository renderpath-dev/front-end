# Pre-commit setup note

This workspace does not currently contain Git metadata, so no Husky hook was
activated.

The `lint-staged` commands are recorded in `package.json`. After this workspace
is intentionally initialized as a Git repository, Husky can be initialized and
a pre-commit hook can run `npx lint-staged`. E2E tests stay out of the
pre-commit path because they are intentionally slower.
