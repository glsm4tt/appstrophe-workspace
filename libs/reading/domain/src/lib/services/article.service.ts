import { inject, Injectable } from '@angular/core';
import { Observable, from, combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Article } from '../entities/article';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { Firestore, collectionData, collection, docData, doc, DocumentReference, CollectionReference, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { ArticleDetailed, Reaction } from '../entities';
import { AppStropher, AuthService } from '@appstrophe-workspace/auth/domain';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _firestore = inject(Firestore);
  private _storage = inject(Storage);
  private _functions = inject(Functions);
  private _authService = inject(AuthService);

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

    const isLiked$ = this._authService.getConnectedUser().pipe(
      switchMap(user => docData(doc(this._firestore, `articles/${id}/reactions/${user.uid}`), {idField: 'id'})),
      catchError(err => of(null)),
      map(reaction => !!reaction),
      distinctUntilChanged()
    );

    return combineLatest([articleDoc$, articleRef$, isLiked$]).pipe(
      map(([article, articleUrl, liked ]) => ({
        ...article,
        articleUrl,
        imageUrl: 'assets/img/logo-search-grid-2x.png',
        author: {
          ...article?.author,
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        },
        liked
      }) as ArticleDetailed)
    );
  }

  async view(articleId: string): Promise<HttpsCallableResult<unknown>> {
    const view = httpsCallable(this._functions, 'view');
    return await view({ articleId });
  }

  async like(articleId: string, user: AppStropher): Promise<unknown> {
    const reactionRef: DocumentReference<Partial<Reaction>> = doc(this._firestore, `articles/${articleId}/reactions/${user.uid}`) as DocumentReference<Partial<Reaction>>;
    return setDoc(reactionRef, {
      type: 'like'
    });
  }

  async unlike(articleId: string, user: AppStropher): Promise<unknown> {
    const reactionRef: DocumentReference<Partial<Reaction>> = doc(this._firestore, `articles/${articleId}/reactions/${user.uid}`) as DocumentReference<Partial<Reaction>>;
    return deleteDoc(reactionRef);
  }
}
