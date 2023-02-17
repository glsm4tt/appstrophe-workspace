import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { ModalService } from "@appstrophe-workspace/shared-lib";

@Component({
    selector: 'apps-read-article-test',
    standalone: true,
    imports: [],
    template: `
    <div class="modal-header">
      <h1>Are you sure you want to delete this comment ?</h1>
    </div>
    <div class="modal-content">
      <p>Once deleted, it will no longer be possible to recover it.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn cancel" (click)="close(false)">Cancel</button>
      <button type="submit" class="btn" (click)="close(true)">Validate</button>
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
        @apply p-2 ml-2;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CommentDeleteConfirmationModalComponent {
  
    private _modalService = inject(ModalService);
  
    close(validate: boolean){
      this._modalService.close(validate);
    }
  }