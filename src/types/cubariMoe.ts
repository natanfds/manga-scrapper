export interface ICubariMoeManga {
  slug: string;
  title: string;
  description: string;
  author: string;
  artist: string;
  cover: string;
  chapters: Record<string, ICubariMoeChapter>; // Indexado pelo número do capítulo
}

export interface ICubariMoeChapter {
  volume: string;
  title: string;
  groups: Record<string, string[]>; // Nome do grupo -> Lista de URLs das páginas
}