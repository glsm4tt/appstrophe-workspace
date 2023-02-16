import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ArticleDetailedWithComments, Comment, CommentService } from '@appstrophe-workspace/reading/domain';
import { ArticleCommentCardComponent } from '../../../ui/article-comment-card/article-comment-card.component';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalService, SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { CommentDeleteConfirmationModalComponent } from '../../../ui/comment-delete-confirmation-modal/comment-delete-confirmation-modal.component';

@Component({
  selector: 'article-comments-list',
  standalone: true,
  imports: [NgForOf, ArticleCommentCardComponent, CommentDeleteConfirmationModalComponent, SharedLibModule],
  template: `<article-comment-card *ngFor="let comment of article?.comments" [comment]="comment" (likeChange)="likeChange(article, comment)" (deleteRequest)="deleteRequest(article, comment)"></article-comment-card>`,
  styles: [`
    :host {
      @apply grid gap-y-2
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentsListComponent implements OnInit {

  @Input() article!: Partial<ArticleDetailedWithComments>;
  
  private _commentService = inject(CommentService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _modalService = inject(ModalService);

  ngOnInit(): void {
    // empty
  }

  likeChange(article: Partial<ArticleDetailedWithComments>, comment: Comment): void {
    this._authService.user$.pipe(
      first()
    ).subscribe(
      async user => {
        if(!user)
          this._router.navigateByUrl(`/auth/login?previous=${this._router.url}`);
        else {
          if(comment.liked)
            await this._commentService.unlikeComment(article.id as string, comment.id, user.uid);
          else
            await this._commentService.likeComment(article.id as string, comment.id, user.uid);
        }
      }
    )
  }

  deleteRequest(article: Partial<ArticleDetailedWithComments>, comment: Comment) {
    // Ask for user confirmation
    const modal = this._modalService.open(CommentDeleteConfirmationModalComponent);

    // If confirmation ok then proceed to deletion
    modal?.onClose.subscribe(
      res => res ? this._commentService.delete(article.id as string, comment.id) : null
    )
  }
}
