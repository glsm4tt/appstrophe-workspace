import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppStropher } from "@appstrophe-workspace/auth/domain";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'apps-user-settings-account',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div data-cy="user-account" class="user_account__container">
      <h2>Delete account</h2>
      <p>Once you delete your account, there is no going back. Please be certain.</p>
      <button type="button" class="btn outlined danger" (click)="deleteRequest.emit()">Delete your account</button>
    </div>
  `,
  styles: [`
    div.user_account__container {
      @apply flex flex-col items-stretch
    }

    div.user_account__container > h2 {
      @apply text-red-600 font-bold pb-1 border-b border-zinc-300 dark:border-zinc-700
    }

    div.user_account__container > p {
      @apply text-sm my-2
    }
  `]
})
export class UserProfileAccountComponent {

  @Input() user: AppStropher;
  @Output() deleteRequest = new EventEmitter<File>();

  readonly faPen = faPen;
}
