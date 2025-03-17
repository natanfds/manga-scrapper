import axios from "axios";
import { DefaultBot } from "./defaultBot";
import { IBotRequestReturn, ICubariMoeManga } from "../types";
import { downloadImage, genChapterFolderName } from "../utils";
import { env } from "../config";
import path from "path";

export class CubariMoeBot extends DefaultBot{

  async getAllChaptersInfo(): Promise<IBotRequestReturn<ICubariMoeManga>>{
    const response = await axios.get(this.infoURL);
    if(response.status === 200) {
      return {
        success: true,
        data: response.data
      }
    } else {
      return {
        success: false,
        data: {
          status: response.status,
          statusText: response.statusText,
          url: this.infoURL,
          data: response.data
        }
      }
    }
  }

  async downloadPages(): Promise<any>{
    
  }

  async downloadNChapter(n: number): Promise<any>{
    const mangaInfo = await this.getAllChaptersInfo()
    if(!mangaInfo.success){
      throw new Error()
    }
    const allChaptersData = (mangaInfo.data as ICubariMoeManga).chapters
    const chaptersList = Object.entries(allChaptersData)
      .map(([chapterNumber, chapterData]) => (chapterData))
    const chapterInfo = chaptersList.filter(
      (e, i) => Number(e.title.split(" ").pop()) === n
    )[0];
    const pagesURLs = Object.entries(chapterInfo.groups).map(([group, pageList]) => pageList)[0]
    const mangaTitle = (mangaInfo.data as ICubariMoeManga).title
    const chapterFolderName = genChapterFolderName(n, chapterInfo.title, mangaTitle)
    

    for(const [i, url] of pagesURLs.entries()){
      const fileFormat = url.split(".").pop()
      await downloadImage(
        url,
        path.join(env.DOWNLOAD_PATH, chapterFolderName),
        `pg_${i}.${fileFormat}`,
      )
    }
    
  }
}