import { MANGAPLUS_HOME } from "../contants";
import { MangaInfoMangaDex } from "../types";
import { createBrowser, logger } from "../utils";

export class MangaPlus{

  async checkForUpdates(): Promise<MangaInfoMangaDex[]>{
    const browser = await createBrowser()
    const page = await browser.newPage();
    await page.goto(`${MANGAPLUS_HOME}/updates`);
    const pageTitle = await page.title()
    logger.info(`Navigate to: ${pageTitle}`);

    const data = await page.$$eval(
      "div.UpdatedTitle-module_titleWrapper_2EQIT", 
      (els: HTMLElement[]) => {
        return els.map(e =>{
          let dataArray = e.innerText.split("\n").map(e => e.trim()).filter(e => e.length > 0);
          if(dataArray.length === 6){
            dataArray.shift()
          }

          return {
            title: dataArray[0],
            author: dataArray[1].split("/").map(e => e.trim()),
            chapter: dataArray[2],
            chapterTitle: dataArray[4],
            url: (e.querySelector("a") as HTMLHyperlinkElementUtils).href
          }
          
        })
      }
    )

    logger.info(`Successfully updated ${data.length} registers`)

    
    await browser.close();
    return data;
  }
}
