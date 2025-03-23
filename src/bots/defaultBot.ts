import { IBotRequestReturn } from "../types";
import { throwErrorIfNotOverwrite } from "../utils";

export class DefaultBot {
  infoURL:string
  constructor(infoURL:string){
    this.infoURL = infoURL
  }

  async getAllChaptersInfo(): Promise<IBotRequestReturn<any>>{
    throwErrorIfNotOverwrite()
    return {
      success: false,
      data: {
        status: 0,
        statusText: "",
        url: "",
        data: ""
      }
    }
  }

  async downloadNChapter(n: number): Promise<any>{
    throwErrorIfNotOverwrite()
  }
}