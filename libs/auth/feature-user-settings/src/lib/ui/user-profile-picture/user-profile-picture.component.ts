import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppStropher } from "@appstrophe-workspace/auth/domain";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'apps-user-settings-picture',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div data-cy="user-picture" class="user_picture__container">
      <img [src]="user?.photoURL" alt="Votre photo">
      <button role="button" class="btn outlined user_picture__edit_button" (click)="uploader.click()">
        <input hidden type="file" #uploader (change)="onPictureSelected($event)"/>
        <fa-icon [icon]="faPen"></fa-icon>
        <span>Edit</span>
      </button>
    </div>
  `,
  styles: [`
    div.user_picture__container {
      @apply relative w-32 h-32
    }

    div.user_picture__container > img {
      @apply h-full w-full object-cover rounded-full border-2 border-orange-500 text-center
    }

    div.user_picture__container > button.user_picture__edit_button {
      @apply absolute left-0 bottom-1
    }

    div.user_picture__container > button.user_picture__edit_button > fa-icon {
      @apply mr-2
    }

    section.user_alias__section {
      @apply my-2 flex flex-col items-center justify-center font-bold
    }
  `]
})
export class UserProfilePictureComponent {

  @Input() user: AppStropher;
  @Output() userPictureChange = new EventEmitter<File>();

  readonly faPen = faPen;

  async onPictureSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    this.userPictureChange.emit(file);
  }
}
