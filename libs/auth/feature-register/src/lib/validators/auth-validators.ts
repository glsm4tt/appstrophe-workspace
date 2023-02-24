import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "@appstrophe-workspace/auth/domain";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const passwordConfirmation = control.get('passwordConfirmation');
        return password && passwordConfirmation && password.value === passwordConfirmation.value ? null : { passwordsNotMatch: true };
    };
}

export function aliasValidator(authService?: AuthService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        if(!new RegExp(/^[a-z0-9_]*$/).test(control.value)) return await { aliascontainsinvalidcharacters: true };
        const exists = await authService.doesAliasAlreadyExists('@' + control.value);
        return exists ? { aliasisalreadytaken: true } : null;
    };
}