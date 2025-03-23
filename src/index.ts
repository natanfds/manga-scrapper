import {env} from "./config";
import axios from 'axios';
import { chromium } from 'playwright';
import { CubariMoeBot } from "./bots/cubariMoe";
import { MangaPlus } from "./bots/mangaPlus";


axios.defaults.validateStatus = (status) => true;


(async () => {
  const bot = new MangaPlus();
  const data = bot.checkForUpdates();


})();