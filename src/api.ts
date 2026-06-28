// API base. Defaults to prod; override per-env with VITE_API_BASE
// (e.g. .env.local: VITE_API_BASE=http://127.0.0.1:5000) for local dev.
export const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://api.yourjobfinder.website';
