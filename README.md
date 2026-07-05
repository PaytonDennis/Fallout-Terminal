This is A Fallout-style interactive terminal — React frontend + Spring Boot backend.

Backend: (backend/, Java 17 / Spring Boot): ApiController exposes GET /api/message, returning text built from DisplayMessage. WebConfig handles CORS so the frontend can call it.

Frontend: (frontend/, React + TS + Vite): IntegratedTerminal.tsx plays terminal.mp4 as a background, overlays live text positioned exactly on the CRT screen (calibrated against the video's actual pixels), fetches the backend message, and types it out via TypingText.tsx. A styled <input> lets users type commands (help, status, back) to switch between screens.

Flow: page loads → video renders → fetch hits /api/message → response gets typed onto the screen → user can type commands to navigate.

Run: backend && ./mvnw spring-boot:run (port 8080), frontend && npm run dev (port 5173).
