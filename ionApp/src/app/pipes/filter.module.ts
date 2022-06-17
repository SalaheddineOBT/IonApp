import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterMarquesPipe } from './filter-Marques.pipe';

@NgModule({
    declarations: [
        FilterMarquesPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [FilterMarquesPipe]
})
export class FilterPipeModule {

}
