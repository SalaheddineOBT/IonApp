import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/providers/form/form-validation.service';

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
        private A
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
                    Validators.pattern(
                        '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                    ),
                ]),
            ],
            confirm: ['', Validators.required],
        });
    }

    register() {

    }

    getErrorMessage(fieldName: string) {
        return this.formValidationService.getErrorMessage(
            fieldName,
            this.registerForm
        );
    }

}
