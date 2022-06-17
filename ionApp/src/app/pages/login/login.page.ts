import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    cars: any;

    loginForm: any = {};

    constructor(private apiService: ApiService, private widgetApi: WidgetUtilService, private router: Router,private fb: FormBuilder) { }

    ngOnInit() {
        if(localStorage.getItem('username')){
            localStorage.clear();
        }
        /*let i = JSON.stringify({selectedBy : 'All'});
        this.apiService.getCars(i).subscribe((res : any) => {
            console.log(res);
        });*/
        this.initeForm();
    }

    initeForm(){
        this.loginForm = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });
    }

    async login(){
        const i = JSON.stringify(this.loginForm.value);
        await this.apiService.login(i);
    }

}
