This is A Fallout-style interactive terminal — React frontend + Spring Boot backend and unit tesing with Junit.

Backend: (Java 17 / Spring Boot): ApiController exposes GET /api/message, returning text built from DisplayMessage. WebConfig handles CORS so the frontend can call it.

Frontend: (React + TS + Vite): IntegratedTerminal.tsx plays terminal.mp4 as a background, overlays live text positioned on the CRT screen, fetches the backend message, and types it out via TypingText.tsx. A styled <input> lets users type commands to switch between screens.

Flow: page loads → video renders → fetch hits /api/message → response gets typed onto the screen → user can type commands to navigate.

Run: backend && ./mvnw spring-boot:run (port 8080), frontend && npm run dev (port 5173).

Commands: Help, Back, Exit, Vault boy, Test


<img width="1615" height="892" alt="falloutterminal" src="https://github.com/user-attachments/assets/d96642c0-37d2-4ea4-ba34-bcac92923b15" />
