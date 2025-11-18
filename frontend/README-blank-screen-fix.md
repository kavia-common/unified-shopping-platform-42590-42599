# Blank screen fix notes

- The store now handles API errors gracefully and provides an empty cart fallback when the backend is unreachable.
- Configure API base URL via `VITE_API_BASE` (see `.env.example`). Default is `http://localhost:3001/api`.
- Run the dev server on a free port:
  - `VITE_PORT=3000 npm run dev` (if port 3000 is free) or
  - `VITE_PORT=3005 npm run dev`

Check the header for any error banner and the effective API base URL being used.
