# Dev Notes API (Foundation Phase)

[![status: draft](https://img.shields.io/badge/status-draft-yellow)]() [![node](https://img.shields.io/badge/node-%3E%3D16-brightgreen)]() [![license](https://img.shields.io/badge/license-MIT-blue)]()

Short description
A minimal, production-minded backend starter using Node.js, Express and TypeScript. This repository contains the Week 1 foundation: deterministic startup, strict runtime validation, and clean module boundaries.

Table of Contents
- Overview
- Objectives of Week 1
- Project Structure
- Key Engineering Decisions
- Issues Encountered & Resolved (Week 1)
- TypeScript Discipline
- Running the Project
- Troubleshooting
- Contributing
- License

Overview
This repository represents Week 1 of a production-grade backend built with Node.js, Express, and TypeScript.

The focus of this phase was not feature development, but startup correctness, architectural boundaries, and runtime safety. Several real-world issues were intentionally surfaced and resolved to harden the foundation before adding business logic.

Objectives of Week 1
- Establish a clean Express + TypeScript setup
- Enforce strict runtime environment validation
- Separate application composition from server bootstrap
- Surface and fix common startup and module-boundary bugs
- Build a backend that either starts correctly or fails immediately

Project Structure
```
src/
├─ app.ts            # Express app composition (pure, no side effects)
├─ server.ts         # HTTP server bootstrap
├─ config/
│  └─ env.ts         # Environment variable validation (fail-fast)
```

Key Engineering Decisions

1. Environment Variable Validation (Fail Fast)
A dedicated configuration layer validates required environment variables at startup. If a required variable (e.g. PORT) is missing, the application crashes immediately.

Why this exists:
- TypeScript cannot guarantee runtime values
- Missing env vars often cause silent or late failures
- Crashing early makes deployment issues obvious and debuggable

2. Separation of App and Server
The Express app (`app.ts`) is intentionally pure:
- No `listen()`
- No environment access
- No startup side effects

The server bootstrap (`server.ts`) is the only place where:
- environment validation is imported
- the HTTP server is started

This separation improves testability and prevents accidental side effects during imports.

Issues Encountered & Resolved (Week 1)

Issue 1: Environment Variables Undefined at Runtime
- Problem: TypeScript compiled successfully, but the application failed at runtime due to missing environment variables (PORT).
- Cause: TypeScript does not know whether environment variables exist at runtime.
- Solution: Added a startup validation layer that crashes the application if required variables are missing.
- Lesson: Type safety does not replace runtime validation. Configuration is part of the system contract.

Issue 2: .env Not Being Loaded
- Problem: Environment validation failed even after defining variables.
- Cause: The `.env` file was not located at the project root, so `dotenv` did not load it.
- Solution: Moved `.env` to the correct location and verified load order.
- Lesson: Tooling conventions matter. Startup order and file placement are architectural concerns.

Issue 3: app.use() Requires a Middleware Function
- Problem: Express threw an error indicating an invalid middleware was being registered.
- Cause: An incorrect import/export caused `undefined` to be passed into `app.use()`.
- Solution: Fixed module boundaries and ensured middleware exports matched their imports.
- Lesson: Imports are contracts. TypeScript won’t protect you from logically incorrect wiring.

Issue 4: Cannot read properties of undefined (reading 'listen')
- Problem: Calling `app.listen()` caused a runtime crash.
- Cause: The Express app was not exported correctly from `app.ts`.
- Solution: Corrected the default export and reinforced the separation between app composition and server bootstrap.
- Lesson: Module boundaries must be explicit. Runtime failures expose architectural mistakes early.

TypeScript Discipline
- `strict: true`
- No implicit `any`
- No ignored compiler errors

TypeScript is treated as a design constraint, not a convenience.

Running the Project

Prerequisites
- Node.js 16+ (or the version you standardize on)
- npm (or yarn)

Install dependencies
```bash
npm install
```

Create `.env` at project root (example)
```env
PORT=5000
# Add other required env variables here
```

Development
```bash
npm run dev
```

Build
```bash
npm run build
npm run start
```

Notes
- The server will only start if all required configuration is valid.
- Keep the `.env` file at the project root so `dotenv` (if used) can load it.

Troubleshooting
- If the app crashes on startup, check the console — the env validator will print which variable is missing.
- Ensure `.env` is in the repository root for local dev or set env vars in your process/CI.

Suggestions / Next steps
- Add a minimal health-check endpoint (`GET /health`) and document it here.
- Add CI badges (GitHub Actions) and unit test instructions.
- Add a CONTRIBUTING.md and a simple code-of-conduct if the repo will accept contributors.
- Consider a Dockerfile and a `docker-compose` dev setup if you plan on containerized development.
- Document any environment variables beyond `PORT` (e.g., DB connection strings).

Contributing
If you want to help, please open issues or PRs. Describe the problem, include steps to reproduce, and include tests when possible.

License
Add your license here (e.g., MIT) and a LICENSE file.

Outcome of Week 1
By the end of Week 1, the project has:
- deterministic startup behavior
- explicit configuration validation
- clean architectural boundaries
- documented failure cases and fixes

This foundation enables safe feature development in later phases.
