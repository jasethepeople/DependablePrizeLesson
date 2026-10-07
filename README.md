# DependablePrizeLesson

A furniture storefront landing-page mockup (the frontend artifact is named **katachi-meshpoint**), built as a Replit export. The API server is a skeleton with only a health endpoint.

## Features

- Single-page storefront (`/` route) showcasing chair products (e.g. "Verde Modular Chair", "Terracotta Cloud Chair") with prices, materials, and badges like "New".
- Product images are loaded from external hosted URLs (v0 / Vercel blob storage), plus a local `chaos-mode.mp4` video in `public/`.
- A `/healthz` endpoint on the API server. No other backend functionality is implemented.

## Tech stack

- Storefront: React, Vite, TypeScript, Wouter, TanStack Query, Tailwind CSS, shadcn/ui.
- API server: Express 5, TypeScript (health endpoint only).
- Monorepo: pnpm workspaces, Node.js 24 (`pnpm-workspace.yaml`).

## Getting started

Standard pnpm workspace commands exist (`pnpm run typecheck`, `pnpm run build` at root), and the Replit agent stack is configured in `.replit` (pnpm, Node.js 24). There is no documented run sequence for this repo beyond the workspace defaults; `pnpm install` then building/serving the `katachi-meshpoint` artifact is the working path.

## Project structure

```
├── artifacts/
│   ├── katachi-meshpoint/  # furniture storefront UI (App.tsx, one Home page,
│   │                       # shadcn/ui components, public/chaos-mode.mp4)
│   ├── api-server/         # Express skeleton — health.ts only
│   └── mockup-sandbox/     # UI mockup sandbox
├── lib/                    # api-spec, api-zod, db workspace packages
└── replit.md               # template text; product/architecture sections unfilled
```

## Status

**Mockup / near-empty.** The storefront is a single landing page wired to external image URLs, and the API server exposes only a health check. `replit.md` is unwritten template text. Exported from https://replit.com/@toddc3112/DependablePrizeLesson.
