import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleBodyComponent } from '../../ui/article/body/body.component';
import { ArticleFooterComponent } from '../../ui/article/footer/footer.component';
import { ArticleHeaderComponent } from '../../ui/article/header/header.component';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  standalone: true,
  imports: [CommonModule, ArticleHeaderComponent, ArticleBodyComponent, ArticleFooterComponent]
})
export class ArticleDetailsComponent implements OnInit {

  constructor() {
    // empty
  }

  ngOnInit() {
    // empty
  }
}
