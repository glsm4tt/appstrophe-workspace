import { FormGroup } from '@angular/forms';

export function PasswordConfirmation(form: FormGroup) {
    return form.get('password')?.value !== form.get('passwordConfirmation')?.value
        ? { passwordsNotMatch: true }
        : null;
}