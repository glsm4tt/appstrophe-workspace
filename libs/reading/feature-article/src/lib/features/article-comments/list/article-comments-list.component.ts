import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment } from '@appstrophe-workspace/reading/domain';
import { ArticleCommentCardComponent } from '../../../ui/article-comment-card/article-comment-card.component';

@Component({
  selector: 'article-comments-list',
  template: `<article-comment-card *ngFor="let comment of comments" [comment]="comment"></article-comment-card>`,
  standalone: true,
  imports: [NgForOf, ArticleCommentCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentsListComponent implements OnInit {

  @Input() comments: Comment[] = [];

  ngOnInit(): void {
    // empty
  }
}
