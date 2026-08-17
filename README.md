This is an end-to-end Fallout-style interactive terminal — React frontend + Spring Boot backend, deployed on AWS with a PostgreSQL database, containerized with Docker and built through a Jenkins CI/CD pipeline. Backend tested with JUnit and Mockito (mocking the database layer); frontend tested with Vitest and React Testing Library.

Backend: (Java 17 / Spring Boot): ApiController exposes GET /api/message. VaultDwellerController and FoodStorageController provide full CRUD (GET/POST/PUT/DELETE) for vault dwellers and food storage items, backed by JPA repositories against a PostgreSQL database on AWS RDS. WebConfig handles CORS for the deployed frontend origin. Deployed on an AWS EC2 instance, fronted by Caddy as a reverse proxy for automatic HTTPS. Containerized with a multi-stage Dockerfile (Maven build stage → lightweight JRE runtime stage). A Jenkins pipeline (Jenkinsfile) automatically builds the JAR, runs the test suite against an in-memory H2 database, and builds the Docker image on every push to main.

Frontend: Vercel (React + TS + Vite): IntegratedTerminal.tsx plays terminal.mp4 as a background, overlays live text positioned on the CRT screen, fetches the backend message, and types it out via TypingText.tsx. A styled input lets users type commands to switch between screens or walk through multi-step flows to add or remove vault dwellers and food storage items, with input validation along the way.

Flow: page loads → video renders → fetch hits the live HTTPS API → response gets typed onto the screen → user can type commands to navigate, view the dweller/food storage databases, or add/remove entries directly from the terminal.

Live deployment: https://working-fallout-terminal.vercel.app/

Run locally: backend && ./mvnw spring-boot:run (port 8080), frontend && npm run dev (port 5173) — note frontend/src/config.ts currently points at the production API, so point it at http://localhost:8080 if you want the local frontend talking to a local backend.

Commands: Help, Status, Back, Exit, Vault boy, Dwellers, Food Storage, Add Dweller, Add Food, Remove Dweller, Remove Food

<img width="1615" height="892" alt="falloutterminal" src="https://github.com/user-attachments/assets/d96642c0-37d2-4ea4-ba34-bcac92923b15" />
