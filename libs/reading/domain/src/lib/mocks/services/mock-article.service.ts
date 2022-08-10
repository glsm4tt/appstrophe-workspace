import { Article } from "../../entities";

export const ArticleServiceMock = {
    getAll: (): Partial<Article>[] => [],
    getOne: (): Partial<Article> => null,
    getComments: (id: string): Comment[] => []
  }
  