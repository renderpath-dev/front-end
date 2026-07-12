# Node.js Static Site Audit CLI

## Status

Planned. This directory currently contains the project brief only.

## Purpose

Build a Node.js command-line tool that audits a local static website directory and produces structured findings for broken local references, missing document metadata, oversized assets, duplicate IDs, and unsupported file paths.

The project connects Node.js runtime fundamentals to a practical front-end engineering workflow. It uses the file system, paths, streams, process arguments, error handling, and exit codes without introducing a web framework.

## Repository Learning Mapping

This project validates concepts from:

- Node.js as a JavaScript host environment.
- ES modules and package scripts.
- `process.argv`, environment behavior, stdout, stderr, and exit codes.
- `node:fs/promises`, directory traversal, and path resolution.
- Streams for large-file inspection or report output.
- Async concurrency with bounded work.
- Error classification and failure propagation.
- JSON and Markdown report generation.

## Product Scenario

A developer runs the CLI against a built static site or simple HTML project:

```bash
site-audit ./dist --format markdown --max-asset-kb 500
```

The tool scans local files, validates references, prints a summary, writes an optional report, and exits with a predictable code that can be used in CI.

## MVP

1. Parse a target directory and documented command-line options.
2. Recursively discover HTML, CSS, JavaScript, image, and font files.
3. Detect local `src` and `href` references that resolve to missing files.
4. Check HTML files for title, description metadata, language attribute, and duplicate IDs.
5. Report assets above a configurable size threshold.
6. Ignore configured directories and generated source maps.
7. Output findings in console, JSON, or Markdown format.
8. Use distinct exit codes for success, audit findings, invalid arguments, and fatal I/O errors.
9. Test traversal, path normalization, finding rules, report output, and exit-code selection.

## Execution Model

```text
CLI arguments
  -> validated options
  -> directory traversal
  -> file classification
  -> bounded asynchronous inspection
  -> normalized findings
  -> selected report formatter
  -> stdout or report file
  -> deterministic process exit code
```

The CLI should return data from internal functions rather than calling `process.exit()` throughout the codebase.

## Suggested Structure

```text
nodejs-static-site-audit-cli/
├── package.json
├── bin/
│   └── site-audit.js
├── src/
│   ├── cli/
│   │   ├── parseArguments.js
│   │   └── runAuditCommand.js
│   ├── audit/
│   │   ├── auditDirectory.js
│   │   ├── inspectHtmlFile.js
│   │   ├── inspectAssetFile.js
│   │   └── resolveLocalReference.js
│   ├── findings/
│   │   ├── findingCodes.js
│   │   └── createFinding.js
│   └── reports/
│       ├── formatConsoleReport.js
│       ├── formatJsonReport.js
│       └── formatMarkdownReport.js
├── fixtures/
│   ├── valid-site/
│   └── invalid-site/
└── tests/
    ├── auditDirectory.test.js
    ├── resolveLocalReference.test.js
    └── reportFormatters.test.js
```

## Engineering Constraints

- Resolve paths relative to the audited document and target root, not the current working directory alone.
- Prevent path traversal outside the configured root.
- Do not follow remote HTTP URLs in the MVP.
- Do not load every large asset fully into memory when metadata is sufficient.
- Bound concurrent file inspection instead of starting an unlimited number of promises.
- Keep audit rules independent from report formatting.
- Write ordinary failures to stderr and machine-readable reports to their selected destination.

## Quality Gates

The completed project should provide:

```bash
npm run lint
npm run test
npm run test:integration
npm pack --dry-run
```

An optional `npm run build` is appropriate only if the project introduces TypeScript or a bundling step. A plain Node.js ESM CLI does not need a fake build process.

## Out of Scope

- Crawling deployed websites.
- Executing page JavaScript in a browser.
- Full HTML or CSS standards validation.
- Accessibility replacement for axe or browser-based audits.
- Image compression or automatic file modification.
- Following symbolic links by default.

## Definition of Done

The MVP is complete when the CLI can audit fixture sites reproducibly, emit stable finding codes in all output formats, protect the target-root boundary, and expose reliable exit codes for local use and CI.

## Extension Ideas

- Add a Playwright adapter for rendered-page checks.
- Add an HTML parser instead of limited initial extraction logic.
- Add a GitHub Actions workflow example.
- Publish the CLI package from a dedicated repository after its interface stabilizes.