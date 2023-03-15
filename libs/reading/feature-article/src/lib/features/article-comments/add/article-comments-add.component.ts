import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { AuthService } from '@appstrophe-workspace/auth/domain';
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
          <textarea (focus)="checkIfConnected($event)" data-cy="input-comment" class="form-group__control" formControlName="comment" id="comment"
              placeholder="Add a comment..." aria-errormessage="inputError"></textarea>
          <fa-icon
          class="form-group__icon start"
          [icon]="faPen"></fa-icon>
        </div>
        <small id="inputError" class="form-group__error" [ngSwitch]="inputError">
          <span *ngSwitchCase="'required'">Comment cannot be empty</span>
          <span *ngSwitchCase="'minlength'">Comment cannot be empty</span>
          <span *ngSwitchCase="'maxlength'">Comment must not exceed 255 characters</span>
        </small>
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

  form.comment-section > div.actions-subsection {
    @apply flex items-center justify-end
  }

  form.comment-section > div.actions-subsection > button.btn {
    @apply p-2 ml-2
  }
  `],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule, SharedLibModule, NgSwitch, NgSwitchCase]
})
export class ArticleCommentsAddComponent implements OnInit {

  @Input() article!: Partial<ArticleDetailedWithComments>;

  readonly faPen = faPen;

  commentForm: FormGroup;

  get inputError() {
    const email = this.commentForm.get('comment');
    return email.touched && email.errors && Object.keys(email.errors)[0]
  }

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

  async submitComment() {
    if (!this.commentForm.value.comment.trim().replace('\n', ''))
      return;
    await this._commentService.addComment(this.article?.id as string, this.commentForm.value.comment);
  }

  checkIfConnected(event: FocusEvent) {
    this._authService.getConnectedUser().pipe(
      first()
    ).subscribe(
      user => {
        if (!user) {
          (event.target as HTMLTextAreaElement).blur();
          this._router.navigateByUrl(`/auth/login?previous=${this._router.url}`);
        }
      }
    )
  }
}
