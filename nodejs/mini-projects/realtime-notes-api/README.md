# Realtime Notes API

This mini project demonstrates authenticated SSE streams, WebSocket upgrade handling, connection registries, PostgreSQL durable event replay, and Redis Pub/Sub live fan-out.

## Setup

Copy the example environment file into the project directory before running database commands.

```powershell
Set-Location D:\node.js\mini-projects\realtime-notes-api
Copy-Item .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
$env:NODE_ENV = "test"; npm test
```

```sh
cd mini-projects/realtime-notes-api
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed
npm run typecheck
NODE_ENV=test npm test
```

## Runtime

```powershell
npm run dev
```

```sh
npm run dev
```

## SSE

`GET /events` opens an authenticated user-scoped `text/event-stream` response. `GET /events/notes/:noteId` verifies note ownership before opening a note-scoped stream. `Last-Event-ID` is parsed as a durable sequence and replayed through PostgreSQL owner filtering.

## WebSocket protocol

The HTTP server handles `GET /ws` through the `upgrade` event. The upgrade validates Origin and cookie session before `ws` accepts the socket.

Client messages:

```json
{ "type": "subscribe.note", "requestId": "00000000-0000-4000-8000-000000000001", "noteId": "00000000-0000-4000-8000-000000000002" }
```

```json
{ "type": "unsubscribe.note", "requestId": "00000000-0000-4000-8000-000000000001", "noteId": "00000000-0000-4000-8000-000000000002" }
```

```json
{ "type": "presence.note", "requestId": "00000000-0000-4000-8000-000000000001", "noteId": "00000000-0000-4000-8000-000000000002", "cursor": { "line": 1, "column": 1 } }
```

Server messages:

```json
{ "type": "connection.ready", "connectionId": "00000000-0000-4000-8000-000000000003" }
```

```json
{ "type": "subscription.accepted", "requestId": "00000000-0000-4000-8000-000000000001", "noteId": "00000000-0000-4000-8000-000000000002" }
```

```json
{ "type": "subscription.rejected", "requestId": "00000000-0000-4000-8000-000000000001", "code": "OWNER_REQUIRED", "message": "The note does not belong to the authenticated user." }
```

## Event delivery boundary

PostgreSQL stores durable `RealtimeEvent` rows. Redis Pub/Sub only notifies currently live API instances and is not used as a replay store.

## Tests

Integration tests require PostgreSQL and Redis. Set `RUN_REALTIME_TESTS=true` when those services and `.env` are ready.

```powershell
$env:RUN_REALTIME_TESTS = "true"; $env:NODE_ENV = "test"; npm test
```

```sh
RUN_REALTIME_TESTS=true NODE_ENV=test npm test
```
