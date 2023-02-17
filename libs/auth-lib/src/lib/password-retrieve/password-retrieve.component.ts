import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'apps-auth-password-retrieve',
  template: `
    <div class="password-retrieve-page">
      <div class="password-retrieve-container">
          <div class="logo">
              <img />
          </div>
          <h3 data-cy="title" class="title">Reset your password</h3>
          <form class="password-retrieve_form" [formGroup]="passwordRetrieveForm" (ngSubmit)="sendPasswordResetEmail()">
              <div class="form-group">
                  <label for="email" class="form-group__label required">Email address</label>
                  <input data-cy="input-email" type="text" class="form-group__control" formControlName="email" id="email"
                      placeholder="Enter your email">
              </div>
              
              <button data-cy="submit" id="passwordRetrieveForm-submit-btn" [disabled]="passwordRetrieveForm.invalid" type="submit" class="btn password-retrieve_form__btn">Send the password reset email</button>
          </form>
      </div>
    </div>
  `,
  styles: [`
    div.password-retrieve-page {
      @apply min-h-screen flex flex-col items-center px-4
    }

    div.password-retrieve-page > div.password-retrieve-container {
      @apply mt-8 flex flex-col items-stretch space-y-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3
    }

    div.password-retrieve-page > div.password-retrieve-container > div.logo {
      @apply flex items-center justify-center 
    }

    div.password-retrieve-page > div.password-retrieve-container > h3.title {
      @apply text-center 
    }

    div.password-retrieve-page > div.password-retrieve-container > h3 {
      @apply text-gray-700 dark:text-gray-300 text-3xl font-semibold
    }

    div.password-retrieve-page > div.password-retrieve-container > form.password-retrieve_form {
      @apply flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-xl rounded-md border-solid border-gray-200 px-12 py-8
    }

    div.password-retrieve-page > div.password-retrieve-container > form.password-retrieve_form button.password-retrieve_form__btn {
      @apply px-8 mt-4 self-stretch
    }
  `],
  standalone: true, 
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PasswordRetrieveComponent implements OnInit {
  passwordRetrieveForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.passwordRetrieveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    // empty
  }

  async sendPasswordResetEmail(){
    if(this.passwordRetrieveForm.valid){
      await this.authService.sendPasswordResetEmail(this.passwordRetrieveForm.get('email')?.value);
      const previous = this.route.snapshot.queryParams['previous'];
      const route = `/auth/login${previous ? '?previous=' + previous : ''}`;
      this.router.navigateByUrl(route);
    } else {
      // Manage form errors
    }
  }
}
