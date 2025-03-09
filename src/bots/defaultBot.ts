import { throwErrorIfNotOverwrite } from "../utils";

export class DefaultBot {
  infoURL:string
  constructor(infoURL:string){
    this.infoURL = infoURL
  }

  async getAllChaptersInfo(): Promise<any>{
    throwErrorIfNotOverwrite()
  }
}