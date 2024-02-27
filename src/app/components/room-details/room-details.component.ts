import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Room } from '../../types/room';
import { RoomService } from '../../services/room.service';
import { NgIf } from '@angular/common';

/*
Component that shows the room details depending on what room number is used in the route path
*/
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{
  roomNumber: number | undefined;
  selectedRoom: Room | undefined;

  constructor(protected route: ActivatedRoute, private roomService: RoomService, private router:Router){

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.roomNumber = params['roomNumber'];
    });

    if(this.roomNumber === undefined){
      throw new Error("Missing room number");
    };

    this.roomService.getRoom(this.roomNumber).subscribe(room => {
      this.selectedRoom = room
    })
  }

  deleteRoom(){
    this.roomService.deleteRoom(this.selectedRoom!.roomNumber).subscribe(() => {this.router.navigate([`room-list`])})
  }
}
