import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.page.html',
    styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('username')){
            this.router.navigate(['/login']);
        }
    }

}
