import { Injectable } from '@angular/core';
import { Article } from '@appstrophe-workspace/reading/domain';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() {
    // empty
  }

  getAll(): Observable<Partial<Article>[]> {
    const articles = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
      id: i,
      title: 'Design Tools',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
      deserunt
      ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
      minus consequuntur!<br>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt
      ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur
      minus consequuntur!`,
      time: 5,
      tags: [{id: 1, name: 'Angular'}],
      imageUrl: 'assets/img/logo-search-grid-2x.png',
      author: {
        id: 1,
        name: 'Sylvain DEDIEU',
        photoUrl: 'assets/img/W9aoBmrb_400x400.jpeg'
      }
    }));
    return of(articles);
  }
}
