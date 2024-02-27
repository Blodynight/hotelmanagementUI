import { Component, OnInit } from '@angular/core';
import { Room } from '../../types/room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomSize } from '../../enums/roomSize';
import { NgFor } from '@angular/common';

/*
This component is the child component of room-details and is mainly a Form to change one or multiple things about a room, except the room number
TODO: 
-Set the option value of the room size select to the corresponding room size of the selected room on init
-Tests
*/
@Component({
  selector: 'app-room-change-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './room-change-form.component.html',
  styleUrl: './room-change-form.component.css'
})
export class RoomChangeFormComponent implements OnInit{
  roomNumber: number | undefined;
  selectedRoom: Room | undefined;
  roomChangeForm: FormGroup;
  roomSizes = Object.values(RoomSize);

  constructor(private route: ActivatedRoute, private roomService: RoomService, private formBuilder: FormBuilder, private router: Router){
    this.roomChangeForm = this.createRoomChangeForm();
  }

  ngOnInit(): void {
    //TODO: Check if this reroute is necessary, parent may be killed after a reload making the room number dissappear
    if(this.route.parent == null){
      this.router.navigate(['rooms']);
      return;
    }

    this.route.parent.params.subscribe(params => {
      this.roomNumber = params['roomNumber'];
    });

    if(this.roomNumber === undefined) {
      throw new Error("Missing Room number");
    };
    this.roomService.getRoom(this.roomNumber).subscribe(room => {
      this.selectedRoom = room;
      this.roomChangeForm.get('minibar')?.setValue(room.minibar);
      this.roomChangeForm.get('booked')?.setValue(room.booked);
      this.roomChangeForm.get('roomSize')?.setValue(room.size);
    });
  }

  createRoomChangeForm(): FormGroup{
    return this.roomChangeForm = this.formBuilder.group({ 
      roomSize: [this.selectedRoom?.size, Validators.required],
      minibar: [false],
      booked: [false]
    });
  }

  onSubmit(roomSize: RoomSize, minibar:boolean, booked: boolean){
    if(this.roomNumber === undefined) {
      throw new Error("Missing Room number")
    }
    this.roomService.changeRoom(this.roomNumber, roomSize, minibar, booked).subscribe(room => this.router.navigate([`room-details/${this.roomNumber}`]));
  }
}
