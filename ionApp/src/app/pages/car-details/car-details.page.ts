import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.page.html',
    styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {

    id: any;
    data: any = [];
    show: any = true;

    constructor(
        private router: Router,
        private routAct: ActivatedRoute,
        private apiService: ApiService,
        private model: ModalController,
        private widgetApi: WidgetUtilService
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            if(this.routAct.snapshot.paramMap.get('id')){
                this.id =this.routAct.snapshot.paramMap.get('id');
            }else{
                this.id = this.apiService.idCarToModel;
                this.show = this.apiService.show;
            }
            this.fillCar(this.id);
        }
    }

    fillCar(id: any){
        this.apiService.getCarById(id).subscribe((res: any) => {
            if(res.success){
                this.data = res.Car[0];
            }else{
                this.widgetApi.toast(res.message,'danger');
            }
            console.log('data', this.data);
        });
    }

    async close(id){
        await this.model.dismiss({
            dismissed: true
        });
        this.router.navigate(['/booking',id]);
    }

}
