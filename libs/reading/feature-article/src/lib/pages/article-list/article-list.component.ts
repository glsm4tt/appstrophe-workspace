import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY, of } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Router, RouterModule } from '@angular/router';
import { Article } from '@appstrophe-workspace/reading/domain';
import { ArticleCardComponent } from '../../ui/article-card/article-card.component';
import { ArticleSearchComponent } from '../../features/article-search/article-search.component';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleCardComponent, ArticleSearchComponent]
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Partial<Article>[]> = EMPTY;
  isLoading$: Observable<boolean> = EMPTY;

  constructor(
    private store: Store<fromArticle.ArticleRootState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.articles$ = this.store.select(fromArticle.selectFilteredArticles);

    this.isLoading$ = this.store.select(fromArticle.selectAreArticlesLoading);

    this.store.dispatch(fromArticle.loadArticles())
  }
}
