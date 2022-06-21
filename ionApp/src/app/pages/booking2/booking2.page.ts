import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
    selector: 'app-booking2',
    templateUrl: './booking2.page.html',
    styleUrls: ['./booking2.page.scss'],
})
export class Booking2Page implements OnInit {

    public id: any;
    public car: any;

    v: any;

    price: any;
    rent: any;
    data: any;
    return: any;

    constructor(
        private router: Router,
        private routerAct: ActivatedRoute,
        private api: ApiService,
        private widjet: WidgetUtilService,
        private loadingCtrl: LoadingController
    ) {
        this.initData();
    }

    async ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.id=this.routerAct.snapshot.paramMap.get('id');
            await this.getCar(this.id);
        }
    }

    initData(){
        this.data = JSON.parse(localStorage.getItem('bookdata'));
        this.price = this.data.priceperttl;
        this.rent = this.data.renton;
        this.return = this.data.returnon;
    }


    getCar(id): Promise<void>{
        return new Promise((resolve,reject) => {
            this.api.getCarById(id).subscribe((res: any) => {
                if(res.success){
                    this.car = res.Car[0];
                    resolve();
                }else{
                    reject();
                }
            });
        });
    }

    async book(){
        const i = JSON.stringify(this.data);
        // await this.reserver(i);
        // await this.client(i);
        // this.loading();
        // setTimeout(() => {
        //     if(this.v){
        //         this.widjet.openSuccessModel('Success Booking !','We\'ll back to you soon !');
        //         localStorage.removeItem('bookdata');
        //         this.router.navigate(['./home']);
        //     }
        // },3000);
        this.api.updateClient(i).subscribe((res: any) => {
            this.v = res.success;
        });
        this.api.booking(i).subscribe((res: any) => {
            this.v = res.success;
        });
        await this.loading();
        setTimeout(() => {
            this.widjet.openSuccessModel('Success Booking !','We\'ll back to you soon !')
            localStorage.removeItem('bookdata');
            this.router.navigate(['./home']);
        },2000);
    }

    reserver(i): Promise<void>{
        return new Promise((resolve,reject) => {
            this.api.booking(i).subscribe((res: any) => {
                if(res.success){
                    resolve();
                    this.v = true;
                }else{
                    this.v = false;
                }
            });
        });
    }

    client(i): Promise<void>{
        return new Promise((resolve,reject) => {
            this.api.updateClient(i).subscribe((res: any) => {
                if(res.success){
                    resolve();
                    this.v = true;
                }else{
                    this.v = false;
                }
            });
        });
    }

    async loading(){
        const loading = await this.loadingCtrl.create({
            message: 'Pleas Wait ....',
            duration: 2000
        });
        return loading.present();
    }

}
