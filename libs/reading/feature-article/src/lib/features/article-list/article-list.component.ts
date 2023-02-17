import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from '@appstrophe-workspace/reading/domain';
import { ArticleCardComponent } from '../../ui/article-card/article-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'apps-read-article-list',
  template: `
    <div class="card-catalog">
      <apps-read-article-card data-cy="article-card" [id]="'article-card-' + article.id" class="card" *ngFor="let article of articles" [article]="article"
        [routerLink]="['/blog/article/' + article.id]"></apps-read-article-card>
    </div>
  `,
  styles: [`
    div.card-catalog {
      @apply grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-2 m-1 
    }

    div.card-catalog .card {
      @apply transition-all ease-in-out duration-300 hover:scale-105 hover:px-0;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {
  @Input() articles!: Partial<Article>[] 

}
