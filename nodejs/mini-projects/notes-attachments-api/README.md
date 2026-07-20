# Notes Attachments API

This mini project extends the protected notes API with multipart uploads, local object storage, PostgreSQL attachment metadata, owner-checked downloads, and soft deletion.

## Setup

Copy the sample environment file from the project directory:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Install dependencies and generate the Prisma client:

```bash
npm install
npm run prisma:generate
```

Run type checking:

```bash
npm run typecheck
```

Run database migrations and integration tests when PostgreSQL is available:

```bash
npm run prisma:migrate:dev
npm test
```

## Upload boundary

`POST /notes/:noteId/attachments` accepts exactly one multipart field named `file`. The server parses the request with Busboy, writes bytes to a temporary file, hashes the bytes, validates extension plus detected magic-number MIME type, copies the object through a local object-store adapter, then inserts attachment metadata.

`POST /notes/:noteId/attachments` requires CSRF because it creates metadata and a stored object. `GET /notes/:noteId/attachments` requires authentication and owner authorization, but it does not use CSRF because it only reads metadata.

## Download boundary

`GET /attachments/:attachmentId/download` performs session authentication and owner authorization before opening the object stream. The response includes `Content-Type`, `Content-Length`, `Content-Disposition`, `ETag`, and `X-Content-Type-Options`.

`GET /attachments/:attachmentId` and `GET /attachments/:attachmentId/download` do not use CSRF. `DELETE /attachments/:attachmentId` uses CSRF because it changes attachment state and removes the stored object. Partial note updates use `PATCH /notes/:noteId`, not `PUT /notes/:noteId`.
