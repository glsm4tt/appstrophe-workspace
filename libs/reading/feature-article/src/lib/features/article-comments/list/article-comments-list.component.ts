import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ArticleDetailedWithComments, Comment, CommentService } from '@appstrophe-workspace/reading/domain';
import { ArticleCommentCardComponent } from '../../../ui/article-comment-card/article-comment-card.component';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'article-comments-list',
  template: `<article-comment-card *ngFor="let comment of article?.comments" [comment]="comment" (likeChange)="likeChange(comment)"></article-comment-card>`,
  standalone: true,
  imports: [NgForOf, ArticleCommentCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentsListComponent implements OnInit {

  @Input() article: Partial<ArticleDetailedWithComments>;
  
  private _commentService = inject(CommentService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  ngOnInit(): void {
    // empty
  }

  likeChange(comment: Comment): void {
    this._authService.user$.pipe(
      first()
    ).subscribe(
      async user => {
        if(!user)
          this._router.navigateByUrl(`/auth/login?previous=${this._router.url}`);
        else {
          if(comment.liked)
            await this._commentService.unlikeComment(this.article.id, comment.id, user.uid);
          else
            await this._commentService.likeComment(this.article.id, comment.id, user.uid);
        }
      }
    )
  }
}
