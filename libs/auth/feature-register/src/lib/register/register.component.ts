import { AsyncPipe, JsonPipe, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@appstrophe-workspace/auth/domain';
import { SharedLibModule, ToasterService } from '@appstrophe-workspace/shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { aliasValidator, passwordValidator } from '../validators/auth-validators';

@Component({
  selector: 'apps-register-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgIf,
    JsonPipe,
    NgSwitch,
    NgSwitchCase,
    SharedLibModule
  ],
  template: `
  <div class="register-page">
    <div class="register-container">
        <h3 data-cy="title" class="title">Register</h3>
        <form class="register_form" [formGroup]="registerForm" (ngSubmit)="register()">
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
                    aria-describedby="passwordHelp" aria-errormessage="passwordError" placeholder="Enter your password" [attr.aria-invalid]="registerForm.controls['password'].invalid">
                <small id="passwordHelp" class="form-group__help">Make a strong password for better security.</small>
                <small id="passwordError" class="form-group__error" [ngSwitch]="passwordError">
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
            <div class="form-group inline">
              <div class="form-group-content">
                <input data-cy="input-terms-and-conditions" type="checkbox" class="form-group__control" formControlName="termsAndConditions" id="termsAndConditions"
                  aria-errormessage="termsAndConditionsError" [attr.aria-invalid]="registerForm.controls['termsAndConditions'].invalid">
                <label for="termsAndConditions" class="form-group__label required">I agree to the <a [href]="termsAndConditions$ | async">terms and conditions</a></label>        
              </div>
              <small id="termsAndConditionsError" class="form-group__error" *ngIf="termsAndConditionsError">
                <span>You have to accept the terms and conditions to continue</span>
              </small>
            </div>        
            <button data-cy="submit" [disabled]="registerForm.invalid" type="submit" class="btn register_form__btn">Register</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    div.register-page {
      @apply min-h-screen flex flex-col items-center px-4
    }

    div.register-page > div.register-container {
      @apply mt-8 flex flex-col items-stretch space-y-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3
    }

    div.register-page > div.register-container > h3.title {
      @apply text-center text-gray-700 dark:text-gray-300 text-3xl font-semibold
    }

    div.register-page > div.register-container > form.register_form {
      @apply flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-xl rounded-md border-solid border-gray-200 px-12 py-8
    }

    div.register-page > div.register-container > form.register_form a {
      @apply text-orange-500 underline
    }

    div.register-page > div.register-container > form.register_form button.register_form__btn {
      @apply px-8 mt-4 self-stretch
    }
  `]
})
export class RegisterComponent implements OnInit {

  termsAndConditions$: Promise<string>;

  readonly registerForm: FormGroup;
  readonly faAt = faAt;

  get emailError() {
    const email = this.registerForm.get('email');
    return email.touched && email.errors && Object.keys(email.errors)[0]
  }

  get aliasError() {
    const alias = this.registerForm.get('alias');
    return alias.touched && alias.errors && Object.keys(alias.errors)[0]
  }

  get passwordError() {
    const password = this.registerForm.get('password');
    return password.touched && password.errors && Object.keys(password.errors)[0]
  }

  get passwordConfirmationError() {
    const passwordConfirmation = this.registerForm.get('passwordConfirmation');
    return passwordConfirmation.touched && this.registerForm.errors && this.registerForm.errors['passwordsNotMatch']
  }

  get termsAndConditionsError() {
    const termsAndConditions = this.registerForm.get('termsAndConditions');
    return termsAndConditions.touched && termsAndConditions.errors && Object.keys(termsAndConditions.errors)?.at(0)
  }

  private _authService = inject(AuthService)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _toasterService = inject(ToasterService);

  constructor() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      alias: new FormControl('', [Validators.required, Validators.maxLength(18)], [aliasValidator(this._authService)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirmation: new FormControl(''),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue])
    }, { validators: passwordValidator() })
  }

  ngOnInit(): void {
    this.termsAndConditions$ = this._authService.getTermsAndConditions();
  }

  async register() {
      try {
        await this._authService.register(this.registerForm.get('alias')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);
        const previous = this._route.snapshot.queryParams['previous'];
        const route = `/auth/login${previous ? '?previous=' + previous : ''}`;
        // Display the success toaster
        this._toasterService.open('User successfully created', 'success')
        this._router.navigateByUrl(route);
      } catch (err) {
        console.error(err);
        // Display the error toaster
        this._toasterService.open('Oups... User creation failed', 'danger');
        throw err;
      }
  }
}
