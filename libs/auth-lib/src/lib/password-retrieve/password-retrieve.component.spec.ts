import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';

import { PasswordRetrieveComponent } from './password-retrieve.component';

describe('PasswordRetrieveComponent', () => {
  let component: PasswordRetrieveComponent;
  let fixture: ComponentFixture<PasswordRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRetrieveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initiate the password retrieve form with default values during the construction and the submit button should be disabled', () => {
    expect(component.passwordRetrieveForm).toBeDefined();
    expect(component.passwordRetrieveForm.get('email')?.value).toEqual('');
    const passwordRetrieveComponentElement: HTMLElement = fixture.nativeElement;
    const email: HTMLInputElement | null = passwordRetrieveComponentElement.querySelector('#email');
    expect(email?.value).toEqual('');
    const submitBtn: HTMLButtonElement | null = passwordRetrieveComponentElement.querySelector('#passwordRetrieveForm-submit-btn');
    expect(submitBtn?.disabled).toBeTruthy();
  });

  it('should have the form sumbit button disabled if the email input isn\t a valid email', () => {
    expect(component.passwordRetrieveForm).toBeDefined();
    component.passwordRetrieveForm.get('email')?.setValue('test');
    fixture.detectChanges();
    const passwordRetrieveComponentElement: HTMLElement = fixture.nativeElement;
    const email: HTMLInputElement | null = passwordRetrieveComponentElement.querySelector('#email');
    expect(email?.value).toEqual('test');
    expect(component.passwordRetrieveForm.get('email')?.invalid).toBeTruthy();
    const emailErrors = component.passwordRetrieveForm.get('email')?.errors as ValidationErrors;
    expect(emailErrors['email']).toBeTruthy();
    const submitBtn: HTMLButtonElement | null = passwordRetrieveComponentElement.querySelector('#passwordRetrieveForm-submit-btn');
    expect(submitBtn?.disabled).toBeTruthy();
  });

  it('should have the form sumbit button enabled if the email input is valid', () => {
    expect(component.passwordRetrieveForm).toBeDefined();
    component.passwordRetrieveForm.get('email')?.setValue('test@toto.ap');
    fixture.detectChanges();
    const passwordRetrieveComponentElement: HTMLElement = fixture.nativeElement;
    const email: HTMLInputElement | null = passwordRetrieveComponentElement.querySelector('#email');
    expect(email?.value).toEqual('test@toto.ap');
    expect(component.passwordRetrieveForm.get('email')?.valid).toBeTruthy();
    expect(component.passwordRetrieveForm.valid).toBeTruthy();
    const submitBtn: HTMLButtonElement | null = passwordRetrieveComponentElement.querySelector('#passwordRetrieveForm-submit-btn');
    expect(submitBtn?.disabled).toBeFalsy();
  });
});
