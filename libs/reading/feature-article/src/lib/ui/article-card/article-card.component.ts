import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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


  constructor() {
    // empty
   }

  ngOnInit(): void { 
    // empty
  }
}
