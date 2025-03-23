import { Browser, chromium } from "playwright";
import { env } from "../config";

export async function createBrowser(): Promise<Browser>{
  const browser = await chromium.launch({
    executablePath: env.BROWSER_PATH,
    headless: env.NODE_ENV != "development"
  });

  return browser;
}