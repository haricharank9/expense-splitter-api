import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}
export const environment = {
  production: process.env.NODE_ENV,
  PORT: process.env.PORT!,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION!
};
