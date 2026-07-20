# Persistent Notes API

This mini project practices PostgreSQL persistence boundaries, Prisma ORM, repository replacement, unified error responses, and database-backed integration tests.

## Technology boundary

- Runtime: Node.js
- HTTP framework: Express 5
- Language: TypeScript strict mode
- Runtime validation: Zod
- Database: PostgreSQL
- ORM: Prisma
- Test runner: Node built-in test runner with Supertest

This project intentionally excludes authentication, Redis, Docker, NestJS, Fastify, and production deployment.

## Environment variables

Copy `.env.example` to `.env`, then adjust `DATABASE_URL` for your local PostgreSQL database.

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/persistent_notes_api?schema=public"
PORT=3000
NODE_ENV=development
```

## Commands

```bash
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
npm test
npm run dev
```

`prisma:migrate:reset` clears and rebuilds the development database. Use it only against a development or test database.

## API response shape

Success response:

```json
{
  "ok": true,
  "data": {}
}
```

Error response:

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  }
}
```

## Data boundary

Controllers adapt HTTP. Services own business results and domain errors. Repositories own Prisma queries. Prisma models are persistence models, not public response DTOs.
