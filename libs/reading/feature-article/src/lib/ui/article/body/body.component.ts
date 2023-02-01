import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
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
  @Input() articleUrl: string;

  ngOnInit() {
    setTimeout(() => console.log(this.articleUrl), 300)
    // empty
  }
}
