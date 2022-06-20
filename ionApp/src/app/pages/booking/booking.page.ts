import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { IonDatetime } from '@ionic/angular';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.page.html',
    styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

    @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

    public bookForm: FormGroup;
    public clientForm: FormGroup;


    id: any;

    today: any;
    rentDate = '';
    returnDate = '';

    constructor(
        private router: Router,
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.today = new Date().toISOString();
    }

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
        this.clientForm = this.fb.group({
            id : [null,Validators.required],
            adresse : [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5)
                ])],
            nationalId : [
                null,
                Validators.compose([
                    Validators.required
                ])
            ],
            permisId : [
                null,
                Validators.compose([
                    Validators.required
                ])
            ],
            phone : [
                null,
                Validators.compose([
                    Validators.required
                ])
            ],
            op : [
                null,
                Validators.compose([
                    Validators.required
                ])
            ]
        });
    }

    formatDate(value: string) {
        return format(parseISO(value), 'dd-MM-yyyy HH:mm');
    }

}
