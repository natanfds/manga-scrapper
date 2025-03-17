import {env} from "./config";
import axios from 'axios';
import { chromium } from 'playwright';
import { CubariMoeBot } from "./bots/cubariMoe";


axios.defaults.validateStatus = (status) => true;


(async () => {
  const a = new CubariMoeBot("https://raw.githubusercontent.com/neiloweeen/Richeh/refs/heads/main/Witch-Hat-Atelier.json");
  const data = await a.downloadNChapter(3);
  console.log(data);
  process.exit()
  const browser = await chromium.launch({
    executablePath: env.BROWSER_PATH,
    headless: env.NODE_ENV != "development"
  });
  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/');
  console.log(await page.title());
  await browser.close();
})();