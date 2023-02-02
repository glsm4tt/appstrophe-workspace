import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ArticleCommentsAddComponent } from './add/article-comments-add.component';
import { ArticleCommentsListComponent } from './list/article-comments-list.component';
import { Observable, EMPTY } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';

@Component({
  selector: 'article-comments',
  template: `
    <div class="commments_section">
      <div class="commments_section__add">
          <article-comments-add></article-comments-add>
      </div>
      <div class="commments_section__list" *ngIf="comments$ | async as comments">
          <article-comments-list [comments]="comments"></article-comments-list>
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

  comments$: Observable<fromArticle.Comment[]> = EMPTY;

  private _store = inject(Store<fromArticle.ArticleRootState>);
  
  readonly faPen = faPen;

  ngOnInit(): void {
    this.comments$ = this._store.select(fromArticle.selectComments);
  }
}
