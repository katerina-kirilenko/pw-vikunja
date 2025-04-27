import * as dotenv from "dotenv";
import { APIs } from "./src/types";

dotenv.config();

async function globalSetup() {
  const response = await fetch(APIs.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
      long_token: true,
    }),
  });

  const { token } = await response.json();
  process.env.API_TOKEN = token;
}

export default globalSetup;
