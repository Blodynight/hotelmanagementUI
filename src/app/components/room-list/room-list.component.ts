import { Component, OnInit } from '@angular/core';
import { Room } from '../../types/room';
import { RoomService } from '../../services/room.service';
import { NgFor } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [NgFor, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{

  rooms: Room[] = [];
  selectedRoom: Room | undefined;

  constructor(private service: RoomService) { 

  }


  ngOnInit(): void {
    this.service.getAllRooms().subscribe((data) => {this.rooms = data})
  }

}
