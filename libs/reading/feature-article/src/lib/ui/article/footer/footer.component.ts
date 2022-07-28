import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'article-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleFooterComponent implements OnInit {
  constructor() {
    // empty
  }

  ngOnInit() {
    // empty
  }
}
