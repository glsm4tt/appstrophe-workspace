import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRetrieveComponent } from './password-retrieve/password-retrieve.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAuth, getAuth } from '@angular/fire/auth';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordRetrieveComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    provideAuth(() => getAuth()),
  ]
})
export class AuthModule { }
