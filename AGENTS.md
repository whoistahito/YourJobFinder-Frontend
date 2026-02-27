# Copilot Instructions

## Project Overview

Job Finder is a React + TypeScript frontend (Vite) with an Express.js backend. It aggregates job listings and delivers
AI-powered daily email alerts to subscribers.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Lucide React
- **Backend:** Express.js (Node.js) via `server.js`
- **Tooling:** ESLint, PostCSS, Docker

## Code Style & Conventions

- Use TypeScript for all new source files under `src/`.
- Use Tailwind utility classes for styling; avoid inline styles.
- Use the `cn` utility from `src/utils/cn.ts` for conditional class merging.
- Place reusable UI components in `src/components/`, page-level components in `src/pages/`.
- Use React Router v6 conventions (`<Link>`, `useNavigate`, `<Routes>`/`<Route>`).
- Custom hooks belong in `src/hooks/`.

## Key Files

- `src/App.tsx` – routing entry point
- `server.js` – Express production server
- `vite.config.ts` – build configuration
- `tailwind.config.js` – Tailwind theme/plugins

## Patterns to Follow

- Keep components focused and composable; lift shared logic into hooks.
- Prefer named exports over default exports for components.
- SEO metadata (Open Graph, JSON-LD) is handled per-page — keep it up to date when adding new routes.
- The backend (`server.js`) serves the built frontend and exposes a `/health` endpoint; add new API routes there
  following the existing pattern.
