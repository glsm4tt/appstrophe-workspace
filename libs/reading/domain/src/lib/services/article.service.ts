import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { combineLatestWith, map, tap } from 'rxjs/operators';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';
import { Firestore, collectionData, collection, docData, doc, DocumentReference, CollectionReference, DocumentData } from '@angular/fire/firestore';
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
    
    const articleComments: CollectionReference<Comment> = collection(this._firestore, `articles/${id}/comments`) as CollectionReference<Comment>;
    const articleComments$: Observable<Partial<Comment>[]> = collectionData(articleComments, { idField: 'id' }).pipe(map(comments => comments.map(c => ({text: c.text}))));

    return articleDoc$.pipe(
      combineLatestWith(articleMetadataDoc$, articleComments$),
      tap(console.log),
      map(([article, { articleUrl }, comments]) => ({
        ...article,
        articleUrl,
        comments,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
          ...article?.author,
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
      }) as ArticleDetailed)
    );
  }

  getComments(articleId: string): Observable<Comment[]> {
    const articleCommentsCollection: CollectionReference<Comment> = collection(this._firestore, `articles/${articleId}/comments`) as CollectionReference<Comment>;
    return collectionData(articleCommentsCollection);
  }
}
