import { Component, OnInit } from '@angular/core';
import { Room } from '../../types/room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomSize } from '../../enums/roomSize';
import { NgFor } from '@angular/common';

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
    if(this.route.parent == null){
      this.router.navigate(['rooms']);
      return;
    }

    this.route.parent.params.subscribe(params => {
      this.roomNumber = params['roomNumber'];
      console.log(params['roomNumber'])
    });

    if(this.roomNumber === undefined) {
      throw new Error("Missing Room number");
    };
    this.roomService.getRoom(this.roomNumber).subscribe(room => {
      this.selectedRoom = room;
      this.roomChangeForm.get('minibar')?.setValue(room.minibar);
      this.roomChangeForm.get('booked')?.setValue(room.booked);
      this.roomChangeForm.get('roomSize')?.setValue(room.size);
      console.log(this.roomChangeForm.get('roomSize'));
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
