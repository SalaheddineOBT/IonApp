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
    public selectedall = JSON.stringify({ selectedBy: 'All' });
    public selectPopular = JSON.stringify({ selectedBy: 'Populaire' });
    public selectedById = JSON.stringify({ selectedBy: 'ById' });
    public token: any = null;

    show: any = false;

    public idCarToModel: any;

    private operationUrl = environment.baseUrl + 'Operations/';

    constructor(
        private httpClient: HttpClient,
    ) { }

    getCars() {
        return this.httpClient.post(this.operationUrl + 'Cars/cars.php', this.selectPopular);
    }

    getPopularCars() {
        return this.httpClient.post(this.operationUrl + 'Cars/cars.php', this.selectedall);
    }

    getMarques() {
        return this.httpClient.post(this.operationUrl + 'Marques/marques.php', this.selectedall);
    }

    getCategories() {
        return this.httpClient.post(this.operationUrl + 'Categories/categories.php', this.selectedall);
    }

    login(i: any){
        return this.httpClient.post(this.operationUrl + 'Authentification/Login.php', i);

    }

    getCarById(id: any) {
        return this.httpClient.post(this.operationUrl + `Cars/cars.php?id=${id}`, this.selectedById);
    };

    register(i: any) {
        return this.httpClient.post(this.operationUrl + 'Authentification/Register.php', i);
    }

    getUserId(token: any){
        return this.httpClient.post(this.operationUrl + 'Authentification/Home.php',token);
    }

    toHome(token: any){
        return this.httpClient.get(this.operationUrl + 'Authentification/Home.php',{
            headers: new HttpHeaders({
                'content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            })
        });
    }

}
