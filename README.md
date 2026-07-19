This is a Fallout-style interactive terminal — React frontend + Spring Boot backend, deployed on AWS with a PostgreSQL database, and unit testing with JUnit and Mockito to mock the database.

Backend: (Java 17 / Spring Boot): ApiController exposes GET /api/message, returning text built from DisplayMessage. WebConfig handles CORS so the frontend can call it. Deployed to an AWS EC2 instance, connected to a PostgreSQL database hosted on AWS RDS.

Frontend: (React + TS + Vite): IntegratedTerminal.tsx plays terminal.mp4 as a background, overlays live text positioned on the CRT screen, fetches the backend message, and types it out via TypingText.tsx. A styled input lets users type commands to switch between screens.

Flow: page loads → video renders → fetch hits the live EC2-hosted API → response gets typed onto the screen → user can type commands to navigate, including adding new Vault Dwellers.

Live deployment: https://working-fallout-terminal.vercel.app/

Run locally: backend && ./mvnw spring-boot:run (port 8080), frontend && npm run dev (port 5173).

Commands: Help, Back, Exit, Vault boy, Test, Dwellers, Food Storage, Add Dweller

<img width="1615" height="892" alt="falloutterminal" src="https://github.com/user-attachments/assets/d96642c0-37d2-4ea4-ba34-bcac92923b15" />
