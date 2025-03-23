interface Title {
  en: string;
}

interface AltTitle {
  [key: string]: string;
}

interface Description {
  [key: string]: string;
}

interface Links {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  cdj?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  engtl?: string;
}

interface TagAttributes {
  name: {
      en: string;
  };
  description: Record<string, never>;
  group: string;
  version: number;
}

interface Tag {
  id: string;
  type: string;
  attributes: TagAttributes;
  relationships: any[];
}

interface Relationship {
  id: string;
  type: string;
  related?: string;
}

interface Attributes {
  title: Title;
  altTitles: AltTitle[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

interface Data {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

export interface IMangaDexMangaSearch {
  result: string;
  response: string;
  data: Data[];
}

export interface VolumeData {
  volume: string; 
  count: number;
  chapters: Record<string, ChapterData>;
}

export interface ChapterData {
  chapter: string;
  id: string;
  others: string[];
  count: number;
}

export interface MangaDexVolumesResponse {
  result: "ok";
  volumes: Record<string, VolumeData>;
}