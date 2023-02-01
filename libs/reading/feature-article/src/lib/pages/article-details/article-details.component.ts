import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleDetailed } from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { ArticleCommentsComponent } from '../../features/article-comments/article-comments.component';
import { ArticleBodyComponent } from '../../ui/article/body/body.component';
import { ArticleFooterComponent } from '../../ui/article/footer/footer.component';
import { ArticleHeaderComponent } from '../../ui/article/header/header.component';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  standalone: true,
  imports: [CommonModule, ArticleHeaderComponent, ArticleBodyComponent, ArticleFooterComponent, ArticleCommentsComponent]
})
export class ArticleDetailsComponent implements OnInit {
  article$: Observable<Partial<ArticleDetailed>> = EMPTY;
  isLoading$: Observable<boolean> = EMPTY;

  constructor(
    private store: Store<fromArticle.ArticleRootState>,
    private route: ActivatedRoute) {
    // empty
  }

  ngOnInit() {
    this.article$ = this.store.select(fromArticle.selectArticle);

    this.isLoading$ = this.store.select(fromArticle.selectIsArticleLoading);

    this.store.dispatch(fromArticle.loadArticle({ articleId: this.route.snapshot.params['articleId'] }))
  }
}
