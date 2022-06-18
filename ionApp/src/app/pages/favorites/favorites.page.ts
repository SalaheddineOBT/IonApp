import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api.service';
import { FavouritesService } from 'src/app/providers/favourites/favourites.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    favoriteCars: any;

    constructor(
        private router: Router,
        private afavService: FavouritesService
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.initCar();
        }
    }

    initCar(){
        const data = JSON.parse(localStorage.getItem('cars'));
        this.favoriteCars = data;
    }

    diFav(item: any){
        this.afavService.removeFav(item);
        this.initCar();
    }

}
