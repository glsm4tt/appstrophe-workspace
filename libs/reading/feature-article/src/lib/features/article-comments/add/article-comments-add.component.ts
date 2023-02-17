import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ArticleDetailedWithComments, CommentService } from '@appstrophe-workspace/reading/domain';

@Component({
  selector: 'apps-read-article-comments-add',
  template: `
    <form class="comment-section" [formGroup]="commentForm" (ngSubmit)="submitComment()">
      <div class="comment-fields">
      <div class="form-group">
          <label class="form-group__label" for="comment">Comment: </label>
          <div class="form-group-content">
          <fa-icon
          class="form-group__icon start"
          [icon]="faPen"></fa-icon>
        <textarea (focus)="checkIfConnected()" data-cy="input-comment" class="form-group__control" formControlName="comment" id="comment"
              placeholder="Add a comment..."></textarea>
          </div>
      </div>
      </div>
      <div class="actions-subsection" *ngIf="commentForm.controls['comment'].value"> 
          <button data-cy="cancel" (click)="commentForm.reset()" id="commentForm-cancel-btn" type="button" class="btn cancel">Cancel</button>
          <button data-cy="submit" [disabled]="commentForm.invalid" id="commentForm-submit-btn" type="submit" class="btn">Comment</button>
      </div>
    </form>
  `,
  styles: [`
  form.comment-section {
    @apply flex flex-col items-stretch
  }

  div.form-group .form-group__icon {
    @apply text-orange-500
  }

  form.comment-section > div.actions-subsection {
    @apply flex items-center justify-end
  }

  form.comment-section > div.actions-subsection > button.btn {
    @apply p-2 ml-2
  }
  `],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule, SharedLibModule]
})
export class ArticleCommentsAddComponent implements OnInit {

  @Input() article!: Partial<ArticleDetailedWithComments>;
  
  readonly faPen = faPen;

  commentForm: FormGroup;

  private _authService = inject(AuthService);
  private _commentService = inject(CommentService);
  private _router = inject(Router);

  constructor() {
      this.commentForm = new FormGroup({
        comment: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(255)])
      })
  }

  ngOnInit(): void {
    // empty
  }

  async submitComment(){
    if(!this.commentForm.value.comment.trim().replace('\n', '')) 
      return;
    await this._commentService.addComment(this.article?.id as string, this.commentForm.value.comment);
  }

  checkIfConnected(){
    this._authService.user$.pipe(
      first()
    ).subscribe(
      user => {
        if(!user)
          this._router.navigateByUrl(`/auth/login?previous=${this._router.url}`)
      }
    )
  }
}
