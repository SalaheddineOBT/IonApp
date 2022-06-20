import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Booking2PageRoutingModule } from './booking2-routing.module';

import { Booking2Page } from './booking2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Booking2PageRoutingModule
  ],
  declarations: [Booking2Page]
})
export class Booking2PageModule {}
