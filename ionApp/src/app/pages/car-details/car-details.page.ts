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

    constructor(
        private router: Router,
        private routAct: ActivatedRoute,
        private apiService: ApiService,
        private model: ModalController,
        private widgetApi: WidgetUtilService
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('username')){
            this.router.navigate(['/login']);
        }else{
            // this.id =this.routAct.snapshot.paramMap.get('id');
            this.id = this.apiService.idCarToModel;
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

    async close(){
        await this.model.dismiss({
            dismissed: true
        });
    }

}
