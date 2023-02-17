import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'apps-read-article-reading',
  imports: [
    RouterModule,
  ],
  template: `<router-outlet></router-outlet>`
})
export class ArticleReadingComponent {
}