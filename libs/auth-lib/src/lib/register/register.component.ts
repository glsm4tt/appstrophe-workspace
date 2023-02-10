import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PasswordConfirmation } from '../validators/password-confirmation.validator';

@Component({
  selector: 'appstrophe-workspace-register',
  template: `
  <div class="register-page">
    <div class="register-container">
        <div class="logo">
            <img />
        </div>
        <h3 data-cy="title" class="title">Register</h3>
        <form class="register_form" [formGroup]="registerForm" (ngSubmit)="register()">
            <div class="form-group">
                <label for="email" class="form-group__label required">Email address</label>
                <input data-cy="input-email" type="text" class="form-group__control" formControlName="email" id="email" aria-describedby="emailHelp"
                    placeholder="Enter your email">
                <small id="emailHelp" class="form-group__help">We'll never share your email with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label for="password" class="form-group__label required">Password</label>
                <input data-cy="input-password" type="password" class="form-group__control" formControlName="password" id="password"
                    aria-describedby="passwordHelp" placeholder="Enter your password">
                <small id="passwordHelp" class="form-group__help">We'll never share your email with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label for="passwordConfirmation" class="form-group__label required">Password Confirmation</label>
                <input data-cy="input-password-confirm" type="password" class="form-group__control" formControlName="passwordConfirmation" id="passwordConfirmation"
                    aria-describedby="passwordConfirmationHelp" placeholder="Enter your password again">
                <small id="passwordConfirmationHelp" class="form-group__help">We'll never share your email with anyone
                    else.</small>
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

    div.register-page > div.register-container > div.logo {
      @apply flex items-center justify-center 
    }

    div.register-page > div.register-container > h3.title {
      @apply text-center 
    }

    div.register-page > div.register-container > h3 {
      @apply text-gray-700 dark:text-gray-300 text-3xl font-semibold
    }

    div.register-page > div.register-container > form.register_form {
      @apply flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-xl rounded-md border-solid border-gray-200 px-12 py-8
    }

    div.register-page > div.register-container > form.register_form button.register_form__btn {
      @apply px-8 mt-4 self-stretch
    }
  `],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterComponent {

  readonly registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required)
    }, { validators: PasswordConfirmation })
  }

  async register() {
    if (this.registerForm.valid) {
      try {
        await this.authService.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);
        const previous = this.route.snapshot.queryParams['previous'];
        const route = `/auth/login${previous ? '?previous=' + previous : ''}`;
        this.router.navigateByUrl(route);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Manage form errors
    }
  }
}
