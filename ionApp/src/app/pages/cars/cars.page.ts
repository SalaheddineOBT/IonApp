import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

    cars: any = [];
    public filterMarques: any = [];
    star: boolean;
    showPages: boolean;
    marques: any=[];
    cate: Array<any> = null;

    path: any = './assets/images/favorite.png';

    options={
        slidesPerView:4,
        centeredSlides:false,
        loop:false,
    };

    selected: any;

    constructor(
        private apiService: ApiService,
        private widgetUtile: WidgetUtilService,
        private router: Router
    ) {
    }

    ngOnInit() {
        if(!localStorage.getItem('username')){
            this.router.navigate(['/login']);
        }else{
            this.showPages=true;
            this.fillCars();
            this.fillMarques();
            this.fillCategories();
        }
    }

    fillCars(){
        this.apiService.getCars().subscribe((res: any)=>{
            if(res.success){
                this.cars=res.Cars;
                this.filterMarques = res.Cars;
                this.showPages=false;
            }else{
                this.widgetUtile.toast(res.message,'danger');
            }
        });
    }

    fillMarques(){
        this.apiService.getMarques().subscribe((res: any)=>{
        if(res.success){
            this.marques=res.Marques;
        }else{
            //   console.log(res.message);
            this.widgetUtile.toast(res.message,'danger');
            //   this.widgetUtile.Toast(res.message,'success');
            //   this.widgetUtile.Toast(res.message,'warning');
        }
        });
    }

    fillCategories(){
        this.apiService.getCategories().subscribe((res: any)=>{
        if(res.success){
            this.cate=res.Categories;
            this.selected='';
                // this.selected=this.cate[0];
        }else{
            //   console.log(res.message);
            this.widgetUtile.toast(res.message,'danger');
        }
        });
    }

    helli(){
        console.log(this.selected);
    }

    doRefresh(event: any) {
        setTimeout(() => {
            this.fillCars();
            this.fillCategories();
            this.fillMarques();
        (event.target as any).complete();
        }, 2000);
    }

    toogleStar(){
        const v = !this.star;
        if(v === true){
            this.path = './assets/images/star.png';
        } else {
            this.path = './assets/images/favorite.png';
        }

        this.star = v;
    }

    public filter(marque: string) {
        this.filterMarques = this.cars.filter((a: any) => {
            if (a.Marque === marque || marque === '') {
                return a;
            }
        });
    }

}
