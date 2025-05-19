import * as fs from "fs";
import * as path from "path";

const tokenPath = path.resolve(__dirname, "../../auth-token.json");

export function loadToken(): string | null {
  if (!fs.existsSync(tokenPath)) return null;

  try {
    const content = fs.readFileSync(tokenPath, "utf-8").trim();

    if (!content) return null;

    return JSON.parse(content).token;
  } catch (e) {
    console.warn("Не удалось распарсить auth-token.json:", e);

    return null;
  }
}
