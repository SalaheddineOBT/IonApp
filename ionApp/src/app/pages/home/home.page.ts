import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    cars: any = [];
    searchKey: any = '';

    private token: any;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private widgetUtile: WidgetUtilService
    ) { }

    async ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.token = atob(localStorage.getItem('user'));
            // alert(this.token);
            await this.fillCars();
            await this.getUserId(this.token);
        }
    }

    navigateToCars = () => this.router.navigate(['/cars']);

    fillCars(): Promise<void>{
        return new Promise((resolve,reject) => {
            this.apiService.getPopularCars().subscribe((res: any)=>{
                if(res.success){
                    this.cars=res.Cars;
                    resolve();
                }else{
                    this.widgetUtile.toast(res.message,'danger');
                    reject();
                }
            });
        });
    }

    changing(e: any) {
        this.searchKey = (e.target as HTMLInputElement).value;
        this.apiService.search.next(this.searchKey);
    }

    getUserId(token: any): Promise<void>{
        return new Promise((resolve,reject) => {
            this.apiService.toHome(token).subscribe((res: any) => {
                console.log(res);
            });
        });
    }

}
