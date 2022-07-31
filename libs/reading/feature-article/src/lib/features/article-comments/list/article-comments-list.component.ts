import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'article-comments-list',
  templateUrl: './article-comments-list.component.html',
  styleUrls: ['./article-comments-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleCommentsListComponent implements OnInit {

  constructor() {
    // empty
  }

  ngOnInit(): void {
    // empty
  }
}
