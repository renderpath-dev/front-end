# Route Refresh Checklist

- Build the app before preview or static hosting.
- Serve the generated `dist` directory.
- Verify `/` loads the learning shell.
- Verify `/router/login` loads after a direct request.
- Verify `/router/dashboard` loads after a direct request.
- Confirm static assets under `/assets/` still return real files.
- Confirm unknown application paths load the Vue app and then show the app-level not-found view.
