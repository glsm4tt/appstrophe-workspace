import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { User } from "@angular/fire/auth";
import { AuthService } from "@appstrophe-workspace/auth/domain";
import { EMPTY, Observable } from "rxjs";

@Component({
  selector: 'apps-user-settings',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
  <div class="user-settings-page">
    <div class="user-settings-container">
        <h3 data-cy="title" class="title">User Settings</h3>
        <ng-container *ngIf="user$ | async as user">
        <img [src]="user?.photoURL" alt="Votre photo">
      <!--  <form class="register_form" [formGroup]="registerForm" (ngSubmit)="register()">
            <div class="form-group">
                <label for="email" class="form-group__label required">Email address</label>
                <input data-cy="input-email" type="text" class="form-group__control" formControlName="email" id="email" aria-describedby="emailHelp"
                    placeholder="Enter your email" aria-errormessage="emailError" [attr.aria-invalid]="registerForm.controls['email'].invalid">
                <small id="emailHelp" class="form-group__help">We'll never share your email with anyone
                    else.</small>
                <small id="emailError" class="form-group__error" [ngSwitch]="emailError">
                  <span *ngSwitchCase="'required'">This field is required</span>
                  <span *ngSwitchCase="'email'">This is not a valid email address</span>
                </small>
            </div>
            <div class="form-group">
                <label for="alias" class="form-group__label required">Alias</label>
                <div class="form-group-content">
                  <input data-cy="input-alias" type="text" class="form-group__control" formControlName="alias" id="alias" aria-describedby="aliasHelp"
                    placeholder="Enter your alias" aria-errormessage="aliasError" [attr.aria-invalid]="registerForm.controls['alias'].invalid">
                  <fa-icon
                  class="form-group__icon start"
                  [icon]="faAt"></fa-icon>
                </div>
                <small id="aliasHelp" class="form-group__help">This will be your alias in appstrophe. Alias are unique and cannot be changed.</small>
                <small id="aliasError" class="form-group__error" [ngSwitch]="aliasError">
                  <span *ngSwitchCase="'required'">This field is required</span>
                  <span *ngSwitchCase="'aliascontainsinvalidcharacters'">Alias must contains only numbers or lowercase letters</span>
                  <span *ngSwitchCase="'aliasisalreadytaken'">Sorry, this alias has already been taken</span>
                  <span *ngSwitchCase="'maxlength'">Alias must not exceed 18 characters</span>
                </small>
            </div>
            <div class="form-group">
                <label for="password" class="form-group__label required">Password</label>
                <input data-cy="input-password" type="password" class="form-group__control" formControlName="password" id="password"
                    aria-describedby="passwordHelp" aria-errormessage="passworError" placeholder="Enter your password" [attr.aria-invalid]="registerForm.controls['password'].invalid">
                <small id="passwordHelp" class="form-group__help">Make a strong password for better security.</small>
                <small id="passworError" class="form-group__error" [ngSwitch]="passwordError">
                  <span *ngSwitchCase="'required'">This field is required</span>
                  <span *ngSwitchCase="'minlength'">Password must have at least 6 characters</span>
                </small>
            </div>
            <div class="form-group">
                <label for="passwordConfirmation" class="form-group__label required">Password Confirmation</label>
                <input data-cy="input-password-confirm" type="password" class="form-group__control" formControlName="passwordConfirmation" id="passwordConfirmation"
                     placeholder="Enter your password again" aria-errormessage="passworConfirmError" [attr.aria-invalid]="registerForm.controls['passwordConfirmation'].invalid">
                <small id="passworConfirmError" class="form-group__error" *ngIf="passwordConfirmationError">
                  <span>Password and confirmation does not match</span>
                </small>
            </div>
            <button data-cy="submit" [disabled]="registerForm.invalid" type="submit" class="btn register_form__btn">Register</button>
        </form> -->
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    div.user-settings-page {
      @apply min-h-screen flex flex-col items-center px-4
    }

    div.user-settings-page > div.user-settings-container {
      @apply mt-8 flex flex-col items-stretch space-y-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3
    }

    div.user-settings-page > div.user-settings-container > h3.title {
      @apply text-center text-gray-700 dark:text-gray-300 text-3xl font-semibold
    }
  `]
})
export class UserSettingsComponent implements OnInit {

  user$: Observable<User | null> = EMPTY;

  private _authService = inject(AuthService);

  ngOnInit(): void {
      this.user$ = this._authService.getConnectedUser();
  }
}
