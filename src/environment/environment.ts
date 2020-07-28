import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}
export const environment = {
  production: process.env.NODE_ENV,
  PORT: process.env.PORT!,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION!,
  SIGNING_SECRET: process.env.SIGNING_SECRET!,
  AUDIENCE: process.env.AUDIENCE!,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY!
};
