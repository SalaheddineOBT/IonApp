import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';
import { CarDetailsPage } from '../car-details/car-details.page';

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

    numTime: number;

    selected: any;

    constructor(
        private apiService: ApiService,
        private widgetUtile: WidgetUtilService,
        private router: Router,
        private model: ModalController,
        private nav: NavController,
        private popover: PopoverController
    ) {
    }

    async ngOnInit() {
        if(!localStorage.getItem('username')){
            this.router.navigate(['/login']);
        }else{
            this.showPages=true;
            await this.fillCars();
            await this.fillMarques();
            await this.fillCategories();
        }
    }

    fillCars(): Promise<void>{
        return new Promise((resolve,reject) => {
            this.apiService.getCars().subscribe((res: any)=>{
                if(res.success){
                    this.cars=res.Cars;
                    this.filterMarques = res.Cars;
                    this.showPages=false;
                    resolve();
                }else{
                    this.widgetUtile.toast(res.message,'danger');
                    reject();
                }
            });
        });
    }

    fillMarques(): Promise<void>{
        return new Promise((resolve,reject) => {
            this.apiService.getMarques().subscribe((res: any)=>{
                if(res.success){
                    this.marques=res.Marques;
                    resolve();
                }else{
                    reject();
                    //   console.log(res.message);
                    this.widgetUtile.toast(res.message,'danger');
                    //   this.widgetUtile.Toast(res.message,'success');
                    //   this.widgetUtile.Toast(res.message,'warning');
                }
            });
        });
    }

    fillCategories(): Promise<void>{
        return new Promise((resolve,reject) => {
            this.apiService.getCategories().subscribe((res: any)=>{
                if(res.success){
                    this.cate=res.Categories;
                    this.selected='';
                        // this.selected=this.cate[0];
                    resolve();
                }else{
                    //   console.log(res.message);
                    this.widgetUtile.toast(res.message,'danger');
                    reject();
                }
            });
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

    async openModel(id: any){
        this.apiService.idCarToModel = id;
        const model = await this.model.create({
            component: CarDetailsPage,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 0.5,
            swipeToClose: true,
            mode: 'ios',
            backdropDismiss: true
        });
        return await model.present();
    }

    // openModel(id: any){
    //     this.nav.navigateForward(`/car-details/${id}`);
    // }

    // async openModel(id: any){
    //     //this.apiService.idCarToModel = id;
    //     const model = await this.popover.create({
    //         component: CarDetailsPage,
    //         componentProps: {
    //             idCar : id
    //         },
    //         event: id
    //     });
    //     return await model.present();
    // }

    loadData(e: any){
        setTimeout(() => {
            e.target.complete();
            if (this.cars.length === 1000) {
                // event.target.disabled = true;
            }
        }, 2000);
    }



}
