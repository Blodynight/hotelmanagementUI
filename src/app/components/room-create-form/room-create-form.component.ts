import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { NgFor } from '@angular/common';
import { RoomSize } from '../../enums/roomSize';
import { Room } from '../../types/room';
import { Router } from '@angular/router';

/*
Component for the form to create a room, booked variable is implicit false for now
*/
@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './room-create-form.component.html',
  styleUrl: './room-create-form.component.css'
})
export class RoomCreateFormComponent {
  roomCreateForm: FormGroup;
  roomSizes = Object.values(RoomSize);

  constructor(private formBuilder: FormBuilder, private roomService: RoomService, private router: Router){
    this.roomCreateForm = this.createRoomCreateForm();
  }

  createRoomCreateForm(): FormGroup{ 
    return this.roomCreateForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      roomSize: ['', Validators.required],
      minibar: [false]
    });
  }

  onSubmit(roomNumber: number, roomSize: RoomSize, minibar:boolean){
    const room: Room= {
      roomNumber: roomNumber,
      size: roomSize,
      minibar: minibar,
      booked: false
    };
    this.roomService.createNewRoom(room).subscribe(room => this.router.navigate([`room-list`]));
  }
}
