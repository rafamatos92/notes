import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models';

@Pipe({
  name: 'filterList',
})
export class FilterListPipe implements PipeTransform {
  search = sessionStorage.getItem('filterList');
  transform(note: Note[]): unknown {
    return note.filter(({ title }) => title.includes(this.search || ''));
  }
}
