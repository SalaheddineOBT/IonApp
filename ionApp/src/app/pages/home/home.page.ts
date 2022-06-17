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

    path: any = './assets/images/favorite.png';
    star: boolean;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private widgetUtile: WidgetUtilService
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('username')){
            this.router.navigate(['/login']);
        }else{
            this.fillCars();
        }
    }

    navigateToCars = () => this.router.navigate(['/cars']);

    fillCars(){
        this.apiService.getCars().subscribe((res: any)=>{
            if(res.success){
                this.cars=res.Cars;
            }else{
                this.widgetUtile.toast(res.message,'danger');
            }
        });
    }

    toogleStar(){
        let v = !this.star;
        this.path = './assets/images/star.png';
        this.star = v;
    }

    changing(e: any) {
        this.searchKey = (e.target as HTMLInputElement).value;
        this.apiService.search.next(this.searchKey);
    }

}
