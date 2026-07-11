---
title: Server Boundary
description: Keep authorization and private runtime config on the server.
navigation: true
---

# Server Boundary

Protected API routes must check the sealed cookie session on the server. Client route middleware only improves navigation experience.

## Status codes

Missing sessions produce 401 responses. Sessions without the required role produce 403 responses.
