import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { FormValidationService } from 'src/app/providers/form/form-validation.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    cars: any;

    loginForm: any = {};

    constructor(
        private fb: FormBuilder,
        private formValidationService: FormValidationService,
        private apiService: ApiService,
        private widdgetApi: WidgetUtilService,
        private router: Router,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit() {
        this.initeForm();
    }

    initeForm(){
        this.loginForm = this.fb.group({
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
        });
    }

    fieldHasError(fieldName: string) {
        return this.formValidationService.fieldHasError(fieldName, this.loginForm);
    }

    getErrorMessage(fieldName: string) {
        return this.formValidationService.getErrorMessage(
            fieldName,
            this.loginForm
        );
    }

    login(){
        if(this.loginForm.valid){
            const i = JSON.stringify(this.loginForm.value);
            this.apiService.login(i).subscribe((res: any)=>{
                if(res.success){
                    this.loading();
                    setTimeout(() => {
                        localStorage.setItem('user',btoa(res.token));
                        //console.log(res.token);
                        this.router.navigate(['/home']);
                        this.initeForm();
                    },3000);

                }else{
                    this.widdgetApi.openErrorModel('Error !',res.message);
                }
            });
        } else {
            this.widdgetApi.openErrorModel('Error !','Fill All Required Fields !');
        }
    }

    async loading(){
        const loading = await this.loadingCtrl.create({
            message: 'Pleas Wait ....',
            duration: 3000
        });
        return loading.present();
    }




}
