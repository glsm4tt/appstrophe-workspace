import { DocumentReference } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";

export const CommentServiceStub = {
    getComments: (id: string): Observable<Comment[]> => of([]),
    addComment: (articleId: string, text: string): Promise<DocumentReference<Partial<Comment>>> => new Promise(resolve => resolve(null)),
    likeComment: (articleId: string, commentId: string, userId: string): Promise<any> => new Promise(resolve => resolve(null)),
    unlikeComment: (articleId: string, commentId: string, userId: string): Promise<any> => new Promise(resolve => resolve(null))
  }
  