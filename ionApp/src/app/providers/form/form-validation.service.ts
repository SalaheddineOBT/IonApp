import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormValidationService {
    constructor() {}

    fieldHasError(fieldName: string, targetForm: any): boolean {
        const formField = targetForm?.controls[fieldName];
        return formField?.invalid && formField?.touched ? true : false;
    }

    getErrorMessage(fieldName: string, targetForm: any): string {
        const formField = targetForm?.get(fieldName);
        const fieldErrors = targetForm?.controls[fieldName].errors;
        return formField?.hasError('required')
        ?
        'Reuired field !'
        :
        formField?.hasError('email')
        ?
        'Incorrect Email Format !'
        :
        formField?.hasError('minlength') && fieldName === 'password'
        ?
        `Password contain at least ${this.getLengthError(fieldErrors?.minlength)} characters !`
        :
        formField?.hasError('maxlength') && fieldName === 'password'
        ?
        `Password contain max ${this.getLengthError(fieldErrors?.maxlength)} characters !`
        :
        formField?.hasError('minlength') && fieldName === 'username'
        ?
        `User Name contain at least ${this.getLengthError(fieldErrors?.minlength)} characters !`
        :
        formField?.hasError('maxlength') && fieldName === 'username'
        ?
        `Password contain max ${this.getLengthError(fieldErrors?.maxlength)} characters !`
        :
        formField?.hasError('pattern') && fieldName === 'password'
        ?
        'Password must contain numbers & upper/lower/special characters !'
        :
        formField?.hasError('pattern') && fieldName === 'email'
        ?
        'Incorrect Email Format !'
        :
        formField?.hasError('mismatch')
        ?
        'Confirm Password Incorrect !'
        :
        'Unknown error !';
    }

    private getLengthError(fieldError: any): string {
        return `(${fieldError?.actualLength}/${fieldError?.requiredLength})`;
    }
}
