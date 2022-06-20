import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-booking2',
    templateUrl: './booking2.page.html',
    styleUrls: ['./booking2.page.scss'],
})
export class Booking2Page implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }
    }

}
