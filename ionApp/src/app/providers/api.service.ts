import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { WidgetUtilService } from './widget-util.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    @Input() isLogin = false;
    public selectedall = JSON.stringify({ selectedBy: 'All' });
    public selectedById = JSON.stringify({ selectedBy: 'ById' });
    public token: any = null;
    public username: any = null;

    headers: HttpHeaders;

    private operationUrl = environment.baseUrl + 'Operations/';
    private photoUrl = environment.baseUrl + 'Photos/';

    constructor(
        private httpClient: HttpClient,
        private widgetApi: WidgetUtilService,
        private router: Router
    ) {

    }

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
                    this.isLogin = true;
                    this.token = d.token;
                    // console.log(this.token);
                    // this.headers.append('Content-Type','application/json');
                    // this.headers.append('Authorization','Bearer ' + this.token);
                    this.headers = new HttpHeaders({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Content-Length': '11100',
                        // 'Authorization': 'Bearer ' + this.token,
                        // 'Access-Control-Allow-Origin': 'https://rumbustious-hilltop.000webhostapp.com/API/Operations/Authentification/Home.php'
                    });
                    this.getDataFromToken(this.token);
                    // this.getLoggedInUser(this.token);
                    resolve();
                    // this.widgetApi.openSuccessModel('SuccessFull Login','You Will Redirect To Home .');
                    // this.router.navigate(['/home']);

                } else {
                    reject();
                    this.widgetApi.openErrorModel('Error', d.message);
                    this.isLogin = false;
                }
            });
        });
    }

    register(i: any) {
        return this.httpClient.post(this.operationUrl + 'Authentification/Register.php', i);
    }

    getDataFromToken(token: any) {

        // const headers = new HttpHeaders();
        // const x = headers.set('Authorization', 'Bearer ' + this.token);
        // console.log(headers.get('Authorization'));
        // console.log({headers});
        this.httpClient.get(this.operationUrl + 'Authentification/Home.php', {
        headers: new HttpHeaders({
            'Authorization' : `Bearer ${token}`,
            'Referer':'rumbustious-hilltop.000webhostapp.com'
        })
        }).subscribe((d => {
            console.log(d);
        }));
    }

    // getLoggedInUser(authtoken: any): Observable<any> {
    //     const header = new Headers({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${authtoken}`
    //     });
    //     return this.httpClient.get<any>(this.operationUrl+'Authentification/Home.php',
    //     {
    //         headers: header
    //     });
    // }

}
