import axios, { AxiosResponse } from "axios";
import { ChapterData, IBotRequestReturn, IMangaDexMangaSearch, MangaDexVolumesResponse, VolumeData } from "../types";
import { MANGADEX_API, USER_AGENT } from "../contants";
import { logger } from "../utils";

export class MangaDexBot{
  title:string;
  id:string;
  constructor(title:string){
    this.title = title;
    this.id = "";
  }

  async getMangaInfo(): Promise<IBotRequestReturn<IMangaDexMangaSearch>>{
    logger.info(`Seraching for ${this.title} ID`)
    const options = {
      method: 'GET',
      url: `${MANGADEX_API}/manga`,
      params: {
        limit: '10',
        title: this.title,
        includedTagsMode: 'AND',
        excludedTagsMode: 'OR',
        'contentRating[]': ['safe', 'suggestive', 'erotica'],
        'order[latestUploadedChapter]': 'desc'
      },
      headers: {
        accept: 'application/json',
        'user-agent': USER_AGENT
      }
    };

    const data: AxiosResponse<IMangaDexMangaSearch> = await axios.request(options);

    let res: IBotRequestReturn<IMangaDexMangaSearch> = {
      success: data.status == 200,
      data: {
        status: data.status,
        statusText: data.statusText,
        url: `${MANGADEX_API}/manga`,
        data: (data.status != 200) ? String(data.data) : "OK"
      }
    }

    if(data.status != 200){
      logger.error(`Request to ${MANGADEX_API}/manga faild status ${data.statusText}`)
      return res
    }

    const mangaData = data.data.data.find(e => e.attributes.title.en === this.title);

    if(!mangaData){
      logger.error(`Title not found ${this.title}`)
      return res
    }
    this.id = mangaData.id;

    logger.info(`${this.title} ID found: ${this.id}`)
    return {
      success: true,
      data: data.data
    }

  }


  async getAllChaptersInfo(): Promise<IBotRequestReturn<MangaDexVolumesResponse>>{
    await this.getMangaInfo();


    const options = {
      method: 'GET',
      url:  `${MANGADEX_API}/manga/${this.id}/aggregate`,
      headers: {
        accept: 'application/json',
        'user-agent': USER_AGENT
      }
    };
    
    const mangaInfo: AxiosResponse<MangaDexVolumesResponse>  = await axios.request(options)


    let res: IBotRequestReturn<MangaDexVolumesResponse> = {
      success: mangaInfo.status == 200,
      data: {
        status: mangaInfo.status,
        statusText: mangaInfo.statusText,
        url: `${MANGADEX_API}/manga`,
        data: (mangaInfo.status != 200) ? String(mangaInfo.data) : "OK"
      }
    }

    if(mangaInfo.status != 200){
      logger.error(`Chapters data not found ${this.id}`)
      return res
    }
    const data = mangaInfo.data;
    console.log(data)
    return {
      success: true,
      data: data
    }
  }

  async downloadNChapter(n: number): Promise<any>{
    const allChaptersInfo = await this.getAllChaptersInfo();

    const flatChapterInfo = ([chapter, chapterData]: [string, ChapterData]) => chapterData;

    const flatVolumeInfo = ([volume, volumeData]: [string, VolumeData]) => Object.entries(volumeData.chapters)
    .map(flatChapterInfo);

    

    const flattedChaptersInfo = Object.entries(
      (allChaptersInfo.data as MangaDexVolumesResponse).volumes
    ).map(flatVolumeInfo).reduce((acc, subArray) => acc.concat(subArray), [])

    const targgetChapter = flattedChaptersInfo.find(el => el.chapter === String(n))
    if(!targgetChapter){
      logger.error(`Chapter ${n} not found for ${this.title} | ${this.id}`);
      return false
    }

    logger.info(`Chapter ${n} found for ${this.title}`, targgetChapter);



  }
}