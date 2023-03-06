import { AsyncPipe, NgIf } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalService } from "@appstrophe-workspace/shared-lib";

@Component({
  selector: 'apps-user-settings-account-delete-confirmation-modal',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  template: `
  <div data-cy="email-update-modal" class="modal">
    <div class="modal-header">
      <h1>Are you sure you want to change your email ?</h1>
    </div>
    <div class="modal-content">
      <p>The new email will be effective next time you login.</p>
    </div>
    <div class="modal-footer">
      <button data-cy="email-confirm-modal-cancel-button" type="button" class="btn cancel" (click)="close(false)">Cancel</button>
      <button data-cy="email-confirm-modal-validate-button"  type="submit" class="btn" (click)="close(true)">Validate</button>
    </div>
  </div>
    `,
    styles: [`
      div.modal-header {
        @apply px-4 py-3 border-b border-zinc-500;
      }
  
      div.modal-content {
        @apply px-4 py-2;
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
export class EmailUpdateConfirmationModalComponent {
  
  private _modalService = inject(ModalService);

  constructor() {
    // empty
  }

  close(validate: boolean) {
    this._modalService.close(validate);
  }
}