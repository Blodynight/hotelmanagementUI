import { Injectable} from '@angular/core';
import { Room } from '../types/room';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService{
  

  constructor(private httpClient: HttpClient) { 

  }
  getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`rooms`);
  }

  createNewRoom(room: Room): Observable<Room>{
    console.log("SENDING REQUEST")
    let roomNumberParam = new HttpParams()
      .set('size', `${room.size.toString().toUpperCase()}`)
      .set('minibar', room.minibar);
    return this.httpClient.put<Room>(`room/${room.roomNumber}`, roomNumberParam);
  }
  
}
