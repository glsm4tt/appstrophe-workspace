import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PasswordConfirmation } from '../validators/password-confirmation.validator';

@Component({
  selector: 'appstrophe-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
