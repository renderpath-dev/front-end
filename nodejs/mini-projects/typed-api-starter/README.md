# typed-api-starter

`typed-api-starter` is a small Express 5 and TypeScript API used by Node.js Chapter 04.

It demonstrates strict TypeScript checking, NodeNext module settings, app/server separation, route/controller/service/repository boundaries, Zod runtime validation, a unified response shape, centralized error handling, request IDs, structured JSON logging, an OpenAPI contract, and Node test runner integration tests with Supertest.

## Commands

```bash
npm install
npm run typecheck
npm test
npm run dev
```

## API routes

- `GET /notes`
- `POST /notes`
- `GET /notes/:id`
- `PATCH /notes/:id`
- `DELETE /notes/:id`

## Response shapes

```json
{
  "ok": true,
  "data": {}
}
```

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

## Environment variables

- `NODE_ENV`: `development`, `test`, or `production`
- `PORT`: HTTP port, default `3000`
- `LOG_LEVEL`: `debug`, `info`, `warn`, or `error`

The project intentionally uses an in-memory repository and does not include persistent storage or external infrastructure.
