import { inject, Injectable } from '@angular/core';
import { CollectionReference, collection, collectionData, DocumentReference, addDoc, doc, setDoc, deleteDoc, Firestore, query, orderBy } from '@angular/fire/firestore';
import { Observable, combineLatestWith, combineLatest, map, switchMap, firstValueFrom } from 'rxjs';
import { Reaction, Comment } from '../entities';
import { AuthService } from '@appstrophe-workspace/auth/domain';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _firestore = inject(Firestore);
  private _authService = inject(AuthService);

  getComments(articleId: string): Observable<Comment[]> {
    const articleCommentsCollection: CollectionReference<Comment> = collection(this._firestore, `articles/${articleId}/comments`) as CollectionReference<Comment>;
    const articleCommentsCollectionQuery = query(articleCommentsCollection, orderBy('date', 'asc'))
    return collectionData(articleCommentsCollectionQuery, { idField: 'id' }).pipe(
      combineLatestWith(this._authService.getConnectedUser()),
      switchMap(([comments, user]) => combineLatest(comments.map(c => collectionData<Reaction>(collection(this._firestore, `articles/${articleId}/comments/${c.id}/reactions`) as CollectionReference<Reaction>, { idField: 'id' }).pipe(
        map(reactions => ({
          ...c,
          reactions,
          liked: !!(user?.uid && reactions.find(r => r.id === user?.uid)),
          owned: user?.uid === c.author.id
        }))
      ))))
    );
  }

  async addComment(articleId: string, text: string): Promise<DocumentReference<Partial<Comment>>> {
    const connectedUser = await firstValueFrom(this._authService.getConnectedUser());
    const articleCommentsCollection: CollectionReference<Partial<Comment>> = collection(this._firestore, `articles/${articleId}/comments`) as CollectionReference<Partial<Comment>>;
    return addDoc(articleCommentsCollection, { text, author: { id: connectedUser.uid } });
  }

  likeComment(articleId: string, commentId: string, userId: string): Promise<void> {
    const articleCommentReactionDoc: DocumentReference<Partial<Reaction>> = doc(this._firestore, `articles/${articleId}/comments/${commentId}/reactions/${userId}`) as DocumentReference<Reaction>;
    return setDoc(articleCommentReactionDoc, { type: 'like' })
  }

  unlikeComment(articleId: string, commentId: string, userId: string): Promise<void> {
    const articleCommentReactionDoc: DocumentReference<Partial<Reaction>> = doc(this._firestore, `articles/${articleId}/comments/${commentId}/reactions/${userId}`) as DocumentReference<Reaction>;
    return deleteDoc(articleCommentReactionDoc);
  }

  delete(articleId: string, commentId: string): Promise<void> {
    const articleCommentDoc: DocumentReference<Comment> = doc(this._firestore, `articles/${articleId}/comments/${commentId}`) as DocumentReference<Comment>;
    return deleteDoc(articleCommentDoc);
  }
}
