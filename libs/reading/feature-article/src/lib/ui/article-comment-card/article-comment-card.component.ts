import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '@appstrophe-workspace/reading/domain';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHandsClapping, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'article-comment-card',
  templateUrl: './article-comment-card.component.html',
  styleUrls: ['./article-comment-card.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SharedLibModule]
})
export class ArticleCommentCardComponent implements OnInit {
  @Input() comment!: Partial<Comment>;

  faHandsClapping = faHandsClapping;
  faComment = faComment;

  constructor() {
    // empty
   }

  ngOnInit(): void { 
    // empty
  }
}
