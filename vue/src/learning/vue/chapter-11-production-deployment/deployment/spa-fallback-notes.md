# SPA Fallback Notes

- `createWebHistory()` uses clean URLs such as `/router/dashboard`.
- A direct browser refresh asks the server for that path.
- Static hosts do not know Vue Router records.
- The server must fall back to `index.html` when the path is not a real file.
- Vue Router still needs an app-level not-found route after the fallback loads the app.
