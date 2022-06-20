import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.page.html',
    styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }
    }
}
