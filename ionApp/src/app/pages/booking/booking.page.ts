import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.page.html',
    styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

    public bookForm: FormGroup;

    private id: any;

    constructor(
        private router: Router,
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.id =this.activeRouter.snapshot.paramMap.get('id');
            // alert(this.id);
        }
    }

    initForm(){
        this.bookForm = this.fb.group({
            priceperttl: [null],
            returnon: [null],
            car: [null],
            client: [null],
            renton: [null]
        });
    }

}
