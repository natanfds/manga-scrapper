import axios from 'axios';
import { MangaDexBot } from './bots';


axios.defaults.validateStatus = (status) => true;


(async () => {
  const bot = new MangaDexBot("Mairimashita! Iruma-kun");
  await bot.downloadNChapter(1);


})();