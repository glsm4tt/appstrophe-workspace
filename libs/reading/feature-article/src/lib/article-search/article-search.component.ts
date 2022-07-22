import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY, map } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { RouterModule } from '@angular/router';
import { Article, Author } from '@appstrophe-workspace/reading/domain';
import { ArticleCardComponent } from '../ui/article-card/article-card.component';

@Component({
  selector: 'article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleCardComponent]
})
export class ArticleSearchComponent implements OnInit {
  articles$: Observable<Partial<Article>[]> = EMPTY;
  isLoading$: Observable<boolean> = EMPTY;

  constructor(
    private store: Store<fromArticle.ArticleRootState>) {
  }

  ngOnInit(): void {
    this.articles$ = this.store.select(fromArticle.selectArticles).pipe(
      map(articles => articles.map(a => ({
        ...a,
        imageUrl: `${this.getAssetPrefix()}${a.imageUrl}`,
        author: {
          ...a.author as Author,
          photoUrl: `${this.getAssetPrefix()}${a.author?.photoUrl}`,
        }
      })))
    );

    this.isLoading$ = this.store.select(fromArticle.selectIsLoading);

    this.store.dispatch(fromArticle.loadArticles())
  }

  private getAssetPrefix(): string {
    return '' // environment.hostUrl;
  }
}
