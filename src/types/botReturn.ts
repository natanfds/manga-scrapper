export interface IBotRequestError{
  status: number;
  statusText: string;
  url: string;
  data: string;
}

export interface IBotRequestReturn<T>{
  success: boolean,
  data: IBotRequestError | T
}