import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const requiredEnvVars = ["PORT", "NODE_ENV"] as const;

type EnvVar = typeof requiredEnvVars[number];

for(const key of requiredEnvVars) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
  }

export const env = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
};