import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavouritesService {

    favoriteList: any = [];

    carsList = new BehaviorSubject<any>([]);

    constructor() {
        // this.carsList.next(JSON.parse(localStorage.getItem('cars')));
        // this.favoriteList = JSON.parse(localStorage.getItem('cars'));
        // console.log(this.favoriteList);
    }

    addToFav(car: any){
        // console.log('deja existe !!!',this.favoriteList);
        // console.log('deja existe !!!',this.carsList);
        this.favoriteList.push(car);
        this.carsList.next(this.favoriteList);
        localStorage.setItem('cars',JSON.stringify(this.carsList.value));

        /*this.favoriteList.map((a: any) => {
            if(car.ID === a.ID){
                console.log('deja existe !!!',this.favoriteList);
                console.log('deja existe !!!',this.carsList);
                return;
            }else{
                this.favoriteList.push(car);
                this.carsList.next(this.carsList);
                console.log('not existe !!!',this.favoriteList);
                console.log('not existe !!!',this.carsList);
            }
        });*/
    }

    removeFav(car: any){
        this.favoriteList.map((a: any, index: any) => {
            if(car.ID === a.ID){
                this.favoriteList.splice(index,1);
                // console.log(a.ID);
            }
        });
        // console.log(this.favoriteList);
    }

}
