import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
import { Article } from '../entities/article';
import { Firestore, collectionData, collection, docData, doc, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { ArticleDetailed, ArticleMetadata } from '../entities';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _firestore = inject(Firestore);

  constructor() {
    // empty
  }

  getAll(): Observable<Article[]> {
    const articlesCollection: CollectionReference<Article> = collection(this._firestore, 'articles') as CollectionReference<Article>;
    return collectionData<Article>(articlesCollection, { idField: 'id' }).pipe(
      map(articles => articles.map(article => ({
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

    const articleMetadataDoc: DocumentReference<ArticleMetadata> = doc(this._firestore, `articles/${id}/metadata/${id}`) as DocumentReference<ArticleMetadata>;
    const articleMetadataDoc$: Observable<ArticleMetadata> = docData(articleMetadataDoc);

    return articleDoc$.pipe(
      combineLatestWith(articleMetadataDoc$),
      map(([article, { articleUrl }]) => ({
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
}
