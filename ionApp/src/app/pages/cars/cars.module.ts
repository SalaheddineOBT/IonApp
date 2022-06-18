import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { CarsPageRoutingModule } from './cars-routing.module';

import { CarsPage } from './cars.page';
import { ApiService } from 'src/app/providers/api.service';
import { FavouritesService } from 'src/app/providers/favourites/favourites.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    CarsPageRoutingModule
  ],
  providers:[ApiService,FavouritesService],
  declarations: [CarsPage]
})
export class CarsPageModule {}
