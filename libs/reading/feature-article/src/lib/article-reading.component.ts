import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'article-reading',
  imports: [
    RouterModule,
  ],
  templateUrl: './article-reading.component.html'
})
export class ArticleReadingComponent {
}