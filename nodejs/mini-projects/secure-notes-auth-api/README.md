# Secure Notes Auth API

This mini project demonstrates password-based authentication, opaque database-backed sessions, cookie boundaries, CSRF checks, credentialed CORS, Helmet, login rate limiting, owner authorization, and a small USER versus ADMIN role contrast.

## Setup

1. Copy .env.example to .env.
2. Create the PostgreSQL database in DATABASE_URL.
3. Run npm install.
4. Run npm run prisma:generate.
5. Run npm run prisma:migrate:dev.
6. Run npm run seed.
7. Run npm run dev.

## Test

Use a separate PostgreSQL test database and then run npm test.

The integration tests expect DATABASE_URL to point at a disposable test database.

macOS / Linux:

```bash
NODE_ENV=test npm test
```

Windows PowerShell:

```powershell
$env:NODE_ENV = "test"; npm test
```
