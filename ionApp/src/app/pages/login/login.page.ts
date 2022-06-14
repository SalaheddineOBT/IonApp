import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    cars: any;

    constructor(private apiService: ApiService, private widgetApi: WidgetUtilService) { }

    ngOnInit() {
        /*let i = JSON.stringify({selectedBy : 'All'});
        this.apiService.getCars(i).subscribe((res : any) => {
            console.log(res);
        });*/


    }

    alert(){
        this.widgetApi.openmodal();
    }

}
