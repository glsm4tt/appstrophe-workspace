import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@appstrophe-workspace/auth-lib';

@Component({
  selector: 'appstrophe-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginComponent {

  readonly loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        await this.authService.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
        this.router.navigateByUrl('/');
      } catch (e) {
        console.error(e);
      }
    } else {
      // Manage form errors
    }
  }
}
