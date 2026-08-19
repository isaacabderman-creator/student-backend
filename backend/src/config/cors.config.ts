import dotenv from "dotenv";
import type { CorsOptions } from "cors";

dotenv.config();

const origin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

export const corsOptions: CorsOptions = {
  origin,
};
