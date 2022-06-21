import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { IonDatetime } from '@ionic/angular';
import { FormValidationService } from 'src/app/providers/form/form-validation.service';
import { ApiService } from 'src/app/providers/api.service';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.page.html',
    styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

    @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

    public bookForm: FormGroup;

    id: any;

    today: any;
    rentDate = '';
    returnDate = '';
    car: any;

    constructor(
        private router: Router,
        private activeRouter: ActivatedRoute,
        private fb: FormBuilder,
        private formValidationService: FormValidationService,
        private api: ApiService
    ) {
        this.today = new Date().toISOString();
    }

    async ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.id =this.activeRouter.snapshot.paramMap.get('id');
            // alert(this.id);
            this.initForm();
            await this.getCar(this.id);
        }
    }

    initForm(){
        this.bookForm = this.fb.group({
            priceperttl: [null,Validators.required],
            returnon: [this.returnDate,Validators.required],
            car: [this.id,Validators.required],
            renton: [this.rentDate,Validators.required],
            client : [2,Validators.required],
            adresse : [
                null,
                Validators.compose([
                    Validators.required,
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
                'Update'
            ]
        });
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

    formatDate(value: string) {
        return format(parseISO(value), 'dd-MM-yyyy HH:mm');
    }

    booking(){
        this.bookForm.value.renton = this.rentDate;
        this.bookForm.value.returnon = this.returnDate;
        this.bookForm.value.priceperttl = this.car.PricePerDay * 6;
        // console.log( this.bookForm.value);
        localStorage.setItem('bookdata',JSON.stringify(this.bookForm.value));
        this.router.navigate(['/booking2',this.id]);

        if(this.bookForm.valid){
            console.log(this.bookForm.value);
        }
    }

    fieldHasError(fieldName: string) {
        return this.formValidationService.fieldHasError(fieldName, this.bookForm);
    }

    getErrorMessage(fieldName: string) {
        return this.formValidationService.getErrorMessage(
            fieldName,
            this.bookForm
        );
    }

}
