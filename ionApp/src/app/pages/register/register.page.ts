import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { FormValidationService } from 'src/app/providers/form/form-validation.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private formValidationService: FormValidationService,
        private apiService: ApiService,
        private widdgetApi: WidgetUtilService,
        private router: Router
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
            phone:[
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(/^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/g)
                ])
            ],
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/g),
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
        if (this.registerForm.valid) {
            const data = JSON.stringify(this.registerForm.value);
            console.log(data);
            this.apiService.register(data).subscribe((res: any) => {
                if(res.success){
                    this.widdgetApi.openSuccessModel('Success Register',res.message);
                    this.router.navigate(['/login']);
                    this.initeForm();
                }else{
                    this.widdgetApi.openErrorModel('Error !',res.message);
                }
            });
        }else{
            this.widdgetApi.openErrorModel('Error !','Error in the following from !');
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
            const passwordVal = this.registerForm?.value.password;
            const forbidden = control.value !== passwordVal;
            return forbidden ? { mismatch: true } : null;
        };
    }

}
