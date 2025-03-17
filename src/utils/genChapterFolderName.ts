export const genChapterFolderName =(
  n: number,
  chapterTitle: string,
  mangaTitle: string,
) => `${mangaTitle.replace(" ", "_")}_CAP_${n}_${chapterTitle.replace(" ", "_")}`
