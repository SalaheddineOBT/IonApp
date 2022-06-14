import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class WidgetUtilService {

    constructor(public toastController: ToastController) { }

    async toast(msg: string,type: string) {
            const toast = await this.toastController.create({
            message: msg,
            duration: 1500,
            color:type
        });
        toast.present();
    }

    openmodal() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You wont To Delete This Reservation ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            heightAuto: false
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You wont To Delete This Reservation ?',
                    icon: 'success',
                    closeButtonHtml:'OK',
                    heightAuto: false
                });
            }
        });
    }


}
