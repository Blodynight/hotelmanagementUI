import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../../types/room';

/*
This Pipe is used in the room-list component to filter the list by unbooked rooms
*/
@Pipe({
  name: 'tableFilter',
  standalone: true
})
export class TableFilterPipe implements PipeTransform {

  transform(list: Room[], filterByUnbooked: boolean){
    return filterByUnbooked ? list.filter((room => room.booked === false)) : list;
  }

}
