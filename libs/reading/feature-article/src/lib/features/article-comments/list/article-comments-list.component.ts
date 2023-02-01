import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment } from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { ArticleCommentCardComponent } from '../../../ui/article-comment-card/article-comment-card.component';
import * as fromArticle from '@appstrophe-workspace/reading/domain';

@Component({
  selector: 'article-comments-list',
  templateUrl: './article-comments-list.component.html',
  styleUrls: ['./article-comments-list.component.css'],
  standalone: true,
  imports: [CommonModule, ArticleCommentCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentsListComponent implements OnInit {

  @Input() comments: Comment[] = [];

  ngOnInit(): void {
    // empty
  }
}
