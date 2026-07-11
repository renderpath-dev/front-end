---
title: Rendering Boundary
description: Separate content rendering from session and browser-only code.
navigation: true
---

# Rendering Boundary

Content pages can be server rendered or prerendered because they do not require a private user session.

## Evidence

The docs route is configured for prerender intent in routeRules, while protected dashboard routes still rely on server checks.
