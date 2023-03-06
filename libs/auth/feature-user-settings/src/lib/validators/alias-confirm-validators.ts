import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function aliasConfirmValidator(alias: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value !== alias ? { aliasdoesnotmatch: true } : null;
    };
}