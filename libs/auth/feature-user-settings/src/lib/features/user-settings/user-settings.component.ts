import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AuthService, UserService, AppStropher } from "@appstrophe-workspace/auth/domain";
import { EMPTY, Observable } from "rxjs";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { SharedLibModule, ToasterService } from "@appstrophe-workspace/shared-lib";
import { UserProfilePictureComponent } from "../../ui/user-profile-picture/user-profile-picture.component";

@Component({
  selector: 'apps-user-settings',
  standalone: true,
  imports: [NgIf, AsyncPipe, UserProfilePictureComponent, SharedLibModule],
  template: `
  <div class="user_settings__page">
    <div class="user_settings__container">
      <h3 data-cy="title" class="title">User Settings</h3>
      <ng-container *ngIf="user$ | async as user">
        <div class="user_settings__sections_container">
          <section class="user_picture__section">
            <apps-user-settings-picture [user]="user" (userPictureChange)="onPictureSelected($event, user)"></apps-user-settings-picture>
          </section>
          <section class="user_alias__section">
            {{user?.alias}}
          </section>
        </div>
      </ng-container>
    </div>
  </div>
  `,
  styles: [`
    div.user_settings__page {
      @apply min-h-screen flex flex-col items-center px-4
    }

    div.user_settings__page > div.user_settings__container {
      @apply mt-8 flex flex-col items-stretch space-y-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3
    }

    div.user_settings__page > div.user_settings__container > h3.title {
      @apply text-center text-gray-700 dark:text-gray-300 text-3xl font-semibold
    }

    div.user_settings__page > div.user_settings__container > div.user_settings__sections_container {
      @apply flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-xl rounded-md border-solid border-gray-200 px-12 py-8
    }

    div.user_settings__sections_container > section.user_picture__section {
      @apply relative flex items-center justify-center
    }

    section.user_alias__section {
      @apply my-2 flex flex-col items-center justify-center font-bold
    }
  `]
})
export class UserSettingsComponent implements OnInit {

  readonly faPen = faPen;

  user$: Observable<AppStropher | null> = EMPTY;

  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _toasterService = inject(ToasterService);

  ngOnInit(): void {
    this.user$ = this._authService.getConnectedUser();
  }

  async onPictureSelected(file: File, user: AppStropher) {
    try {
      await this._userService.uploadProfilePicture(file, user);
    } catch (err) {
      this._toasterService.open('Oups... Profile picture update failed', 'danger');
    }
  }
}
