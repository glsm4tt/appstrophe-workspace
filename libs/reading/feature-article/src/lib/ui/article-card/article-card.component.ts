import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '@appstrophe-workspace/reading/domain';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleCardComponent implements OnInit {
  @Input() article!: Partial<Article>;

  @Output() clicked = new EventEmitter<Partial<Article>>();


  constructor() {
    // empty
   }

  ngOnInit(): void { 
    // empty
  }

  onClick(article: Partial<Article>) {
    this.clicked.emit(article);
  }
}
