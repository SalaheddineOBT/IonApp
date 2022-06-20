import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Booking2Page } from './booking2.page';

const routes: Routes = [
  {
    path: '',
    component: Booking2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Booking2PageRoutingModule {}
