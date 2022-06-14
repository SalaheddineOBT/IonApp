import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public selectedall = JSON.stringify({selectedBy:'All'});
    public selectedById = JSON.stringify({selectedBy:'ById'});
    public token: any = null;
    public username: any = null;

    private operationUrl = environment.baseUrl + 'Operations/';
    private photoUrl = environment.baseUrl + 'Photos/';

    constructor(private httpClient: HttpClient) { }

    getCars() {
        return this.httpClient.post(this.operationUrl + 'Cars/cars.php', this.selectedall);
    }

    getMarques() {
        return this.httpClient.post(this.operationUrl + 'Marques/marques.php', this.selectedall);
    }

    getCategories() {
        return this.httpClient.post(this.operationUrl + 'Categories/categories.php', this.selectedall);
    }

    login(i: any) {
        return this.httpClient.post(this.operationUrl + 'Authentification/Login.php', i).pipe();
    }

    register(i: any) {
        return this.httpClient.post(this.operationUrl + 'Authentification/Register.php', i);
    }

    getDataFromToken(token: any) {
        this.httpClient.get(this.operationUrl, {
            headers: new HttpHeaders(
                {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                })
        });
    }


}
