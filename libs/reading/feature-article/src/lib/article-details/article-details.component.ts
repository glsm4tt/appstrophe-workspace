import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleDetailsComponent implements OnInit {

  constructor() {
    // empty
  }

  ngOnInit() {
    // empty
  }
}
