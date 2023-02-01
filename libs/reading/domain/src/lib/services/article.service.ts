import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../entities/article';
import { Comment } from '../entities/comment';
import { Firestore, collectionData, collection, docData, doc, DocumentReference, CollectionReference, DocumentData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private firestore: Firestore) {
    // empty
  }

  getAll(): Observable<Article[]> {
    const articlesCollection: CollectionReference<Article> = collection(this.firestore, 'articles') as CollectionReference<Article>;
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


    /*
    const articles = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
      id: i.toString(),
      title: 'Design Tools',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
      deserunt
      ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
      minus consequuntur!<br>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt
      ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
      minus consequuntur!`,
      time: 5,
      tags: [{ id: '1', name: 'Angular' }],
      imageUrl: 'assets/img/logo-search-grid-2x.png',
      author: {
        id: '1',
        name: 'Sylvain DEDIEU',
        photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
      }
    }));
    return of(articles);
    */
  }

  getOne(id: string): Observable<Article> {
    const articleDoc: DocumentReference<Article> = doc(this.firestore, `articles/${id}`) as DocumentReference<Article>;
    return docData(articleDoc);
    /*
    const article = {
      id: id,
      title: 'Design Tools',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
  deserunt
  ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
  minus consequuntur!<br>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt
  ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
  minus consequuntur!`,
      time: 5,
      tags: [{ id: '1', name: 'Angular' }],
      imageUrl: 'assets/img/logo-search-grid-2x.png',
      author: {
        id: '1',
        name: 'Sylvain DEDIEU',
        photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
      }
    };
    return of(article);
    */
  }

  getComments(articleId: string): Observable<Comment[]> {
    const articleCommentsCollection: CollectionReference<Comment> = collection(this.firestore, `articles/${articleId}/comments`) as CollectionReference<Comment>;
    return collectionData(articleCommentsCollection);

    /*
    const comment: Comment = {
      id: '1',
      replies: [{
        id: '1',
        author: {
          id: '1',
          name: 'Sylvain DEDIEU',
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        },
        date: new Date(),
        text: 'reply',
        likes: [1, 2, 3].map(i => ({
          id: i.toString(), name: '', author: {
            id: '1',
            name: 'Sylvain DEDIEU',
            photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
          }
        }))
      }],
      author: {
        id: '1',
        name: 'Sylvain DEDIEU',
        photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
      },
      date: new Date(),
      text: `Ceci est un texte\n sur deux niveaux.\n  avec un tab.`,
      likes: [1, 2, 3].map(i => ({
        id: i.toString(), name: '', author: {
          id: '1',
          name: 'Sylvain DEDIEU',
          photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
        }
      }))
    };

    return of([comment]);
    */
  }
}
