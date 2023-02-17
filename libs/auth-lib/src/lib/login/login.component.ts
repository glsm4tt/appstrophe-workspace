import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'apps-auth-login',
  template: `
    <div class="login-page">
      <div class="login-container">
          <div class="logo">
              <img />
          </div>
          <h3 data-cy="title" class="title">Sign in</h3>
          <form class="sign-in_form" [formGroup]="loginForm" (ngSubmit)="login()">
              <div class="form-group">
                  <label for="email" class="form-group__label required">Email address</label>
                  <input data-cy="input-email" type="text" class="form-group__control" formControlName="email" id="email"
                      placeholder="Enter your email">
              </div>
              <div class="form-group">
                  <label for="password" class="form-group__label required">Password</label>
                  <a data-cy="password-retrieve-link" class="form-group__label-link" [routerLink]="['/auth/password-retrieve']" [queryParams]="{previous}">Forgot password?</a>
                  <input data-cy="input-password" type="password" class="form-group__control" formControlName="password" id="password"
                      placeholder="Enter your password">
              </div>
              <button data-cy="submit" [disabled]="loginForm.invalid" id="loginForm-submit-btn" type="submit" class="btn sign-in_form__btn">Sign in</button>
          </form>

          <div data-cy="register-link-container" class="no-account">
              New to this blog? <a data-cy="register-link" [routerLink]="['/auth/register']" [queryParams]="{previous}">Create an account</a>.
          </div>
      </div>
    </div>
  `,
  styles: [`
    div.login-page {
      @apply min-h-screen flex flex-col items-center px-4
    }

    div.login-page > div.login-container {
      @apply mt-8 flex flex-col items-stretch space-y-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3
    }

    div.login-page > div.login-container > div.logo {
      @apply flex items-center justify-center 
    }

    div.login-page > div.login-container > h3.title {
      @apply text-center 
    }

    div.login-page > div.login-container > h3 {
      @apply text-gray-700 dark:text-gray-300 text-3xl font-semibold
    }

    div.login-page > div.login-container > form.sign-in_form {
      @apply flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-xl rounded-md border-solid border-gray-200 px-12 py-8
    }

    div.login-page > div.login-container > form.sign-in_form button.sign-in_form__btn {
      @apply px-8 mt-4 self-stretch
    }

    div.login-page > div.login-container > div.no-account {
      @apply flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-600 rounded-md p-4
    }

    div.login-page > div.login-container > div.no-account > a {
      @apply text-orange-500 hover:text-orange-600 pl-1
    }
  `],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginComponent implements OnInit {

  previous!: string;
  readonly loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnInit(){
    this.previous = this.route.snapshot.queryParams['previous'];
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        await this.authService.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
        const previousRoute = this.route.snapshot.queryParams['previous'] ?? '/';
        this.router.navigateByUrl(previousRoute);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Manage form errors
    }
  }
}
