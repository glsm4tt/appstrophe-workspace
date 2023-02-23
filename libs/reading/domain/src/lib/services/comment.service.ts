import { inject, Injectable } from '@angular/core';
import { CollectionReference, collection, collectionData, DocumentReference, addDoc, doc, setDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Observable, combineLatestWith, mergeMap, combineLatest, map, startWith } from 'rxjs';
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
    return collectionData(articleCommentsCollection, { idField: 'id' }).pipe(
      combineLatestWith(this._authService.user$),
      mergeMap(([comments, user]) => combineLatest(comments.map(c => collectionData<Reaction>(collection(this._firestore, `articles/${articleId}/comments/${c.id}/reactions`) as CollectionReference<Reaction>, { idField: 'id' }).pipe(
        startWith([]),
        map(reactions => ({
          ...c,
          reactions,
          liked: !!(user?.uid && reactions.find(r => r.id)),
          owned: true //user?.uid === c.author.id
        }))
      ))))
    );
  }

  addComment(articleId: string, text: string): Promise<DocumentReference<Partial<Comment>>> {
    const articleCommentsCollection: CollectionReference<Partial<Comment>> = collection(this._firestore, `articles/${articleId}/comments`) as CollectionReference<Partial<Comment>>;
    return addDoc(articleCommentsCollection, { text });
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
