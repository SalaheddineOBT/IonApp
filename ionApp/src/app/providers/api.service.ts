import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { WidgetUtilService } from './widget-util.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public search = new BehaviorSubject<string>('');
    isLogin = false;
    public selectedall = JSON.stringify({ selectedBy: 'All' });
    public selectedById = JSON.stringify({ selectedBy: 'ById' });
    public token: any = null;
    public username: any = null;

    public idCarToModel: any;

    private operationUrl = environment.baseUrl + 'Operations/';

    constructor(
        private httpClient: HttpClient,
        private widgetApi: WidgetUtilService,
        private router: Router
    ) { }

    getCars() {
        return this.httpClient.post(this.operationUrl + 'Cars/cars.php', this.selectedall);
    }

    getMarques() {
        return this.httpClient.post(this.operationUrl + 'Marques/marques.php', this.selectedall);
    }

    getCategories() {
        return this.httpClient.post(this.operationUrl + 'Categories/categories.php', this.selectedall);
    }

    login(i: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(this.operationUrl + 'Authentification/Login.php', i).subscribe((d: any) => {
                if (d.success) {
                    localStorage.setItem('username','salaheddine');
                    this.isLogin = true;
                    this.token = d.token;
                    this.getDataFromToken(this.token);
                    resolve();
                    // this.widgetApi.openSuccessModel('SuccessFull Login','You Will Redirect To Home .');
                    this.router.navigate(['/home']);

                } else {
                    reject();
                    this.widgetApi.openErrorModel('Error', d.message);
                    this.isLogin = false;
                }
            });
        });
    }

    getCarById(id: any) {
        return this.httpClient.post(this.operationUrl + `Cars/cars.php?id=${id}`, this.selectedById);
    };

    register(i: any) {
        return this.httpClient.post(this.operationUrl + 'Authentification/Register.php', i);
    }

    getDataFromToken(token: any) {
        this.httpClient.get(this.operationUrl + 'Authentification/Home.php', {
        headers: new HttpHeaders({
            'Authorization' : `Bearer ${token}`
        })
        }).subscribe((d => {
            console.log(d);
        }));
    }



}
