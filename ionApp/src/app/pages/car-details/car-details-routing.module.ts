import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarDetailsPage } from './car-details.page';

const routes: Routes = [
  {
    path: '',
    component: CarDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarDetailsPageRoutingModule {}
