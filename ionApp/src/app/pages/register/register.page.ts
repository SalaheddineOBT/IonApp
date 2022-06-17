import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from 'src/app/providers/api.service';
import { FormValidationService } from 'src/app/providers/form/form-validation.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: any = [];

    constructor(
        private fb: FormBuilder,
        private formValidationService: FormValidationService,
        private apiService: ApiService,
        private widdgetApi: WidgetUtilService
    ) { }

    ngOnInit() {
        this.initeForm();
    }

    fieldHasError(fieldName: string) {
        return this.formValidationService.fieldHasError(fieldName, this.registerForm);
    }

    initeForm() {
        this.registerForm = this.fb.group({
            username: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30),
                ])
            ],
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
                    Validators.minLength(5),
                    Validators.maxLength(30),
                ])
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                    Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
                ]),
            ],
            confirm: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                    Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
                    this.passwordMatchValidator()
                ])
            ]
        });
    }

    register() {
        if(this.registerForm.valid){
            const data = JSON.stringify(this.registerForm.value);
            console.log(data);
            // this.apiService.register(data).subscribe((res: any) => {
            //     if(res.success){
            //         this.widdgetApi.openSuccessModel('Success Register',res.message);
            //     }else{
            //         this.widdgetApi.openSuccessModel('Error !',res.message);
            //     }
            // });
        }

    }

    getErrorMessage(fieldName: string) {
        return this.formValidationService.getErrorMessage(
            fieldName,
            this.registerForm
        );
    }

    private passwordMatchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const passwordVal = this.registerForm?.get('password')?.value;
            const forbidden = control.value !== passwordVal;
            return forbidden ? { mismatch: true } : null;
        };
    }

}
