import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ArticleCommentsAddComponent } from './add/article-comments-add.component';
import { ArticleCommentsListComponent } from './list/article-comments-list.component';
import { Observable, EMPTY, combineLatest} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';

@Component({
  selector: 'apps-read-article-comments',
  template: `
    <div class="commments_section" *ngIf="articleWithComments$ | async as article">
      <div class="commments_section__add">
          <apps-read-article-comments-add [article]="article"></apps-read-article-comments-add>
      </div>
      <div class="commments_section__list">
          <apps-read-article-comments-list [article]="article"></apps-read-article-comments-list>
      </div>
    </div>
  `,
  styles: [`
    div.commments_section > div.commments_section__add {
        @apply pt-4 pb-2 border-t-2 border-gray-700 dark:border-gray-300
    }

    div.commments_section > div.commments_section__list {
        @apply pt-4 pb-2 border-t-2 border-gray-700 dark:border-gray-300
    }
  `],
  standalone: true,
  imports: [NgIf, AsyncPipe, ArticleCommentsListComponent, ArticleCommentsAddComponent]
})
export class ArticleCommentsComponent implements OnInit {

  articleWithComments$: Observable<Partial<fromArticle.ArticleDetailedWithComments>> = EMPTY;

  private _store = inject(Store<fromArticle.ArticleRootState>);
  
  readonly faPen = faPen;

  ngOnInit(): void {
    const article$ = this._store.select(fromArticle.selectArticle);
    const comments$ = this._store.select(fromArticle.selectComments);
    this.articleWithComments$ = combineLatest([article$, comments$]).pipe(
      map(([article, comments]) => ({...article, comments} as fromArticle.ArticleDetailedWithComments))
    )
  }
}
