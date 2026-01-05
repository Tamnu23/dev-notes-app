// src/app.ts
// Core Express app setup for Developer Notes API
// ============================================

import express, { Application } from "express"; // Express app + TS types
import { healthRouter } from "./routes/health.route"; // Health check routes
import { errorMiddleware } from "./middlewares/error.middleware"; // Global error handler
import { env } from "./config/env"; // Typed, validated environment variables

// -------------------------
// 1️⃣ Initialize Express app
// -------------------------
const app: Application = express();

// -------------------------
// 2️⃣ Middleware
// -------------------------
app.use(express.json()); // Parse JSON body for all requests

// -------------------------
// 3️⃣ Routes
// -------------------------
app.use("/health", healthRouter); // Health check endpoint

// -------------------------
// 4️⃣ Error handling
// -------------------------
app.use(errorMiddleware); // Global error catcher

// -------------------------
// 5️⃣ Export app (testable)
// -------------------------
export default app;
