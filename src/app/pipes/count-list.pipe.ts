import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countList', pure: false })
export class CountListPipe implements PipeTransform {
  transform(list: Array<any>, counter: any) {
    counter.count = list.length;
    return list;
  }
}
