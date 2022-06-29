import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@appstrophe-workspace/auth-lib';

@Component({
  selector: 'appstrophe-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  readonly loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.authService.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
  }
}
