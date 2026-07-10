# Static Hosting Notes

- Upload only the `dist` directory output from `npm run build`.
- Serve `index.html` for application routes that do not match a real file.
- Keep `index.html` on a short cache policy.
- Cache hashed assets under `assets/` with a long immutable policy.
- Do not upload source files, `node_modules`, tests, or local environment files.
