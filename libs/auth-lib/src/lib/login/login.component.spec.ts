import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationErrors } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initiate the login form with default values during the construction and the submit button should be disabled', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toEqual('');
    expect(component.loginForm.get('password')?.value).toEqual('');
    const loginComponentElement: HTMLElement = fixture.nativeElement;
    const email: HTMLInputElement | null = loginComponentElement.querySelector('#email');
    expect(email?.value).toEqual('');
    const password: HTMLInputElement | null = loginComponentElement.querySelector('#password');
    expect(password?.value).toEqual('');
    const submitBtn: HTMLButtonElement | null = loginComponentElement.querySelector('#loginForm-submit-btn');
    expect(submitBtn?.disabled).toBeTruthy();
  });

  it('should have the form sumbit button disabled if the email input isn\t filled', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toEqual('');
    component.loginForm.get('password')?.setValue('1234');
    fixture.detectChanges();
    const loginComponentElement: HTMLElement = fixture.nativeElement;
    const email: HTMLInputElement | null = loginComponentElement.querySelector('#email');
    expect(email?.value).toEqual('');
    const password: HTMLInputElement | null = loginComponentElement.querySelector('#password');
    expect(password?.value).toEqual('1234');
    expect(component.loginForm.get('email')?.invalid).toBeTruthy();
    const emailErrors = component.loginForm.get('email')?.errors as ValidationErrors;
    expect(emailErrors['required']).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
    const submitBtn: HTMLButtonElement | null = loginComponentElement.querySelector('#loginForm-submit-btn');
    expect(submitBtn?.disabled).toBeTruthy();
  });

  it('should have the form sumbit button disabled if the email input isn\t a valid email', () => {
    expect(component.loginForm).toBeDefined();
    component.loginForm.get('email')?.setValue('test');
    component.loginForm.get('password')?.setValue('1234');
    fixture.detectChanges();
    const loginComponentElement: HTMLElement = fixture.nativeElement;
    const email: HTMLInputElement | null = loginComponentElement.querySelector('#email');
    expect(email?.value).toEqual('test');
    const password: HTMLInputElement | null = loginComponentElement.querySelector('#password');
    expect(password?.value).toEqual('1234');
    expect(component.loginForm.get('email')?.invalid).toBeTruthy();
    const emailErrors = component.loginForm.get('email')?.errors as ValidationErrors;
    expect(emailErrors['email']).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
    const submitBtn: HTMLButtonElement | null = loginComponentElement.querySelector('#loginForm-submit-btn');
    expect(submitBtn?.disabled).toBeTruthy();
  });

  it('should have the form sumbit button disabled if the password input isn\t filled', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('password')?.value).toEqual('');
    component.loginForm.get('email')?.setValue('toto@test.te');
    fixture.detectChanges();
    const loginComponentElement: HTMLElement = fixture.nativeElement;
    const password: HTMLInputElement | null = loginComponentElement.querySelector('#password');
    expect(password?.value).toEqual('');
    const email: HTMLInputElement | null = loginComponentElement.querySelector('#email');
    expect(email?.value).toEqual('toto@test.te');
    expect(component.loginForm.get('password')?.invalid).toBeTruthy();
    const emailErrors = component.loginForm.get('password')?.errors as ValidationErrors;
    expect(emailErrors['required']).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
    const submitBtn: HTMLButtonElement | null = loginComponentElement.querySelector('#loginForm-submit-btn');
    expect(submitBtn?.disabled).toBeTruthy();
  });

  it('should have the form sumbit button enabled if the email and password inputs are valid', () => {
    expect(component.loginForm).toBeDefined();
    component.loginForm.get('email')?.setValue('toto@test.te');
    component.loginForm.get('password')?.setValue('aA123456@');
    fixture.detectChanges();
    const loginComponentElement: HTMLElement = fixture.nativeElement;
    const password: HTMLInputElement | null = loginComponentElement.querySelector('#password');
    expect(password?.value).toEqual('aA123456@');
    expect(component.loginForm.get('email')?.valid).toBeTruthy();
    const email: HTMLInputElement | null = loginComponentElement.querySelector('#email');
    expect(email?.value).toEqual('toto@test.te');
    expect(component.loginForm.get('password')?.valid).toBeTruthy();
    expect(component.loginForm.valid).toBeTruthy();
    const submitBtn: HTMLButtonElement | null = loginComponentElement.querySelector('#loginForm-submit-btn');
    expect(submitBtn?.disabled).toBeFalsy();
  });
});
