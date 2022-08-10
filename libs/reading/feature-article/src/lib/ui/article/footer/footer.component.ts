import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { Article } from '@appstrophe-workspace/reading/domain';
import { faHandsClapping, faComment, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, Observable, shareReplay } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromArticle from '@appstrophe-workspace/reading/domain';

@Component({
  selector: 'article-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SharedLibModule]
})
export class ArticleFooterComponent implements OnInit {

  article$: Observable<Partial<Article>> = EMPTY;

  faHandsClapping = faHandsClapping;
  faComment = faComment;
  faArrowUpFromBracket = faArrowUpFromBracket;

  constructor(private store: Store<fromArticle.ArticleRootState>) {
    // empty
  }

  ngOnInit() {
    this.article$ = this.store.select(fromArticle.selectArticle).pipe(shareReplay(1))
  }
}
