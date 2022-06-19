import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.page.html',
    styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

    private id: any;

    constructor(
        private router: Router,
        private activeRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.id =this.activeRouter.snapshot.paramMap.get('id');
            // alert(this.id);
        }
    }

}
