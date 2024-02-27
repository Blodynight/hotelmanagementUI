import { Injectable} from '@angular/core';
import { Room } from '../types/room';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RoomSize } from '../enums/roomSize';

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
      .set('size', room.size.toString().toUpperCase())
      .set('minibar', room.minibar);
    return this.httpClient.put<Room>(`room/${room.roomNumber}`, roomNumberParam);
  }

  getRoom(roomNumber:number): Observable<Room> {
    return this.httpClient.get<Room>(`room/${roomNumber}`);
  }

  changeRoom(roomNumber:number, roomSize: RoomSize, minibar: boolean, booked:boolean){
    let roomParams = new HttpParams()
      .set('size', roomSize.toString().toUpperCase())
      .set('minibar', minibar)
      .set('booked', booked);
    return this.httpClient.patch<Room>(`room/${roomNumber}`, roomParams)
  }

  deleteRoom(roomNumber: number): Observable<void>{
    return this.httpClient.delete<void>(`room/${roomNumber}`);
  }
  
}
