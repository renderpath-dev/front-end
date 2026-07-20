# Redis Job Notes API

A learning mini project for Redis cache-aside reads, Redis fixed-window rate limiting, and BullMQ background exports.

## Runtime

- Node.js 26 or newer
- PostgreSQL
- Redis

## Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run dev
```

Windows PowerShell setup:

```powershell
Copy-Item .env.example .env
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/redis_job_notes_api?schema=public"
$env:REDIS_URL = "redis://localhost:6379"
npm run dev
```

Start the worker in a second terminal:

```bash
npm run worker
```

## Boundary model

- PostgreSQL owns users, sessions, notebooks, notes, and export status rows.
- Redis owns short-lived cache keys, fixed-window counters, and BullMQ queue state.
- HTTP returns `202 Accepted` for export creation and exposes completion through `GET /exports/:exportId`.
- The worker may retry a job, so the handler checks the status row before writing the final result.
