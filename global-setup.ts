import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { APIs } from "@types";

dotenv.config();

const tokenPath = path.resolve(__dirname, "auth-token.json");

async function globalSetup() {
  // Если токен уже сохранён — скипаем
  if (fs.existsSync(tokenPath)) {
    console.log("Токен уже существует");
    return;
  }

  const response = await fetch(APIs.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
      long_token: true,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Вход не удался: ${response.status} ${response.statusText}`,
    );
  }

  const { token } = await response.json();
  console.log("token", token);
  fs.writeFileSync(tokenPath, JSON.stringify({ token }, null, 2));
  console.log("Токен сохранен в auth-token.json");
}

export default globalSetup;
