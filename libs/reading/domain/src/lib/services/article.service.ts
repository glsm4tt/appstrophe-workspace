import { inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
import { Article } from '../entities/article';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { Firestore, collectionData, collection, docData, doc, DocumentReference, CollectionReference, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { ArticleDetailed } from '../entities';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _firestore = inject(Firestore);
  private _storage = inject(Storage);
  private _functions = inject(Functions);

  getAll(): Observable<Article[]> {
    const articlesCollection: CollectionReference<Article> = collection(this._firestore, 'articles') as CollectionReference<Article>;
    return collectionData<Article>(articlesCollection, { idField: 'id' }).pipe(
      map((articles: Article[]) => articles.map(article => ({
        ...article,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
          ...article?.author,
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
      })))
    );
  }

  getOne(id: string): Observable<ArticleDetailed> {
    const articleDoc: DocumentReference<Article> = doc(this._firestore, `articles/${id}`) as DocumentReference<Article>;
    const articleDoc$: Observable<Article> = docData(articleDoc, { idField: 'id' });

    const articleRef = ref(this._storage, `articles/${id}/markdown/article.md`);
    const articleRef$ = from(getDownloadURL(articleRef));

    return articleDoc$.pipe(
      combineLatestWith(articleRef$),
      map(([article,  articleUrl ]) => ({
        ...article,
        articleUrl,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
          ...article?.author,
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
      }) as ArticleDetailed)
    );
  }

  async view(articleId: string): Promise<HttpsCallableResult<unknown>> {
    const view = httpsCallable(this._functions, 'view');
    return await view({ articleId });
  }
}
