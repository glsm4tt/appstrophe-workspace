import { Observable, of } from "rxjs";
import { Article } from "../../entities";

export const ArticleServiceStub = {
    getAll: (): Observable<Partial<Article>[]> => of([]),
    getOne: (): Observable<Partial<Article>> => of(null)
  }
  