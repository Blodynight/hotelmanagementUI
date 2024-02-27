import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../types/room';
import { RoomService } from '../../services/room.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import { TableFilterPipe } from '../../shared/pipes/table-filter.pipe';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [NgFor, RouterOutlet, RouterLink, RouterLinkActive, TableFilterPipe, FormsModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{

  rooms: Room[] = [];
  @Input() filterByUnbooked: boolean = false;

  constructor(private service: RoomService,  private router: Router) {  
  }

  ngOnInit(): void {
    this.service.getAllRooms().subscribe((data) => {this.rooms = data.sort(({roomNumber:a}, {roomNumber:b}) => a-b)});
  }

  onClick(roomNumber: number): void {
    this.router.navigate([`room-details/${roomNumber}`])
  }

}
