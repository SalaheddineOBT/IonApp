import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMarques'
})
export class FilterMarquesPipe implements PipeTransform {

    transform(value: any[], filterString: string, popName: string): any[] {
        const result: any = [];
        if (!value || filterString === '' || popName === '') {
            return value;
        }
        value.forEach((a: any) => {
            if (a[popName].trim().toLowerCase().includes(filterString.toLowerCase())) {
                result.push(a);
            }
        });
        return result;
    }

}
