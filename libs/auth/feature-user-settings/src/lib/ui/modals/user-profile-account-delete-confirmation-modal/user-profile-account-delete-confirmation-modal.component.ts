import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { AppStropher, AuthService } from "@appstrophe-workspace/auth/domain";
import { ModalService } from "@appstrophe-workspace/shared-lib";
import { EMPTY, Observable, tap } from "rxjs";
import { entryConfirmValidator } from "../../../validators/entry-confirm-validators";

@Component({
  selector: 'apps-user-settings-account-delete-confirmation-modal',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  template: `
    <form data-cy="alias-confirm-modal" *ngIf="user$ | async as user" [formGroup]="deleteAccountForm" (ngSubmit)="close(true)">
        <div class="modal-header">
          <h1>Are you sure you want to delete your account ?</h1>
        </div>
        <div class="modal-content">
          <p>To confirm, please type <span>{{user?.alias}}</span> in the input bellow.</p>
          <div class="form-group danger">
            <input data-cy="input-alias-confirm" type="text" class="form-group__control" formControlName="aliasConfirm" id="alias-confirm"
              [placeholder]="user?.alias" aria-describedby="alias-confirm-help" aria-errormessage="alias-confirm-error" [attr.aria-invalid]="deleteAccountForm.controls['aliasConfirm'].invalid">
              <small id="alias-confirm-help" class="form-group__help">Once deleted, it will no longer be possible to recover it.</small>
              <small id="alias-confirm-error" class="form-group__error" *ngIf="aliasConfirmError">
                <span>This entry does not match {{user?.alias}}</span>
              </small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" data-cy="alias-confirm-modal-cancel-button" class="btn cancel" (click)="close(false)">Cancel</button>
          <button type="submit" data-cy="alias-confirm-modal-validate-button" class="btn danger" [disabled]="deleteAccountForm.invalid">Validate</button>
        </div>
    </form>
    `,
  styles: [`
      div.modal-header {
        @apply px-4 py-3 border-b border-zinc-500;
      }
  
      div.modal-content {
        @apply px-4 py-2;
      }

      div.modal-content > p {
        @apply my-2
      }

      div.modal-content > p > span {
        @apply font-bold
      }
  
      div.modal-footer {
        @apply px-4 py-3 border-t border-zinc-500 flex items-center justify-end;
      }
  
      div.modal-footer > button.btn {
        @apply ml-2;
      }
    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDeleteConfirmationModalComponent implements OnInit {

  readonly deleteAccountForm: FormGroup;
  user$: Observable<AppStropher> = EMPTY

  private _modalService = inject(ModalService);
  private _authService = inject(AuthService);

  get aliasConfirmError() {
    const alias = this.deleteAccountForm.get('aliasConfirm');
    return alias.touched && alias.errors && Object.keys(alias.errors)[0]
  }

  constructor() {
    this.deleteAccountForm = new FormGroup({
      aliasConfirm: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.user$ = this._authService.getConnectedUser().pipe(tap(
      user => this.deleteAccountForm.get('aliasConfirm').addValidators([entryConfirmValidator(user?.alias)])
    ));
  }

  close(validate: boolean) {
    this._modalService.close(validate);
  }
}