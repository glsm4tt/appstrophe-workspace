import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, PasswordConfirmation } from '@appstrophe-workspace/auth-lib';

@Component({
  selector: 'appstrophe-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  
  readonly registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }, { validators: PasswordConfirmation })
  }

  register(){
    this.authService.createUserWithEmailAndPassword(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value)
  }
}
