import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const JWT_SECRET = secret;
export const JWT_EXPIRES_IN = "1h";
