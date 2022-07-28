import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'article-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  imports: [CommonModule, MarkdownModule, FontAwesomeModule]
})
export class ArticleBodyComponent implements OnInit {
  articleUrl: string;

  constructor() {
    this.articleUrl = 'assets/article.md'
  }

  ngOnInit() {
    // empty
  }
}
