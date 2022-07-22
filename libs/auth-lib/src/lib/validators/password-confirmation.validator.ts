import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

  export const PasswordConfirmation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
  
    return password && passwordConfirmation && password.value === passwordConfirmation.value ? null : { passwordsNotMatch: true };
  };