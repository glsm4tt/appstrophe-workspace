import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
