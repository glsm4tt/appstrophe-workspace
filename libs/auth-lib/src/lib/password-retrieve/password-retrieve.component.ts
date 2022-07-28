import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'appstrophe-workspace-password-retrieve',
  templateUrl: './password-retrieve.component.html',
  styleUrls: ['./password-retrieve.component.css'],
  standalone: true, 
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PasswordRetrieveComponent implements OnInit {
  passwordRetrieveForm: FormGroup;

  constructor(private authService: AuthService) {
    this.passwordRetrieveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    // empty
  }

  async sendPasswordResetEmail(){
    if(this.passwordRetrieveForm.valid){
      await this.authService.sendPasswordResetEmail(this.passwordRetrieveForm.get('email')?.value)
    } else {
      // Manage form errors
    }
  }
}
