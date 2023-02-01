import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';
import { Firestore, collectionData, collection, docData, doc, DocumentReference, CollectionReference, DocumentData } from '@angular/fire/firestore';


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

  getOne(id: string): Observable<Article> {
    const articleDoc: DocumentReference<Article> = doc(this._firestore, `articles/${id}`) as DocumentReference<Article>;
    return docData(articleDoc, { idField: 'id' }).pipe(
      map(article => ({
        ...article,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
          ...article?.author,
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
      }))
    );
  }

  getComments(articleId: string): Observable<Comment[]> {
    const articleCommentsCollection: CollectionReference<Comment> = collection(this._firestore, `articles/${articleId}/comments`) as CollectionReference<Comment>;
    return collectionData(articleCommentsCollection);
  }
}
