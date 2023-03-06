import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function entryConfirmValidator(entry: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value !== entry ? { entrydoesnotmatch: true } : null;
    };
}

export function diffrentEntryConfirmValidator(entry: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value === entry ? { entrydoesmatch: true } : null;
    };
}