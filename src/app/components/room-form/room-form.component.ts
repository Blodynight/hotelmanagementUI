import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { NgFor } from '@angular/common';
import { RoomSize } from '../../enums/roomSize';
import { Room } from '../../types/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent {
  roomForm: FormGroup;
  roomSizes = Object.values(RoomSize);

  constructor(private formBuilder: FormBuilder, private roomService: RoomService, private router: Router){
    this.roomForm = this.createRoomForm();
  }

  createRoomForm(): FormGroup{ 
    return this.roomForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      roomSize: ['', Validators.required],
      minibar: [false]
    });
  }

  onSubmit(roomNumber: number, roomSize: String, minibar:boolean){
    console.log("SUBMITTING");
    const room: Room= {
      roomNumber: roomNumber,
      size: roomSize as RoomSize,
      minibar: minibar
    };
    this.roomService.createNewRoom(room).subscribe(room => this.router.navigate([`rooms`]));
  }
}
