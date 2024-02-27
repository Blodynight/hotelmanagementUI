import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hotelmanagement';
  inputRoomNumber: string | undefined;

  constructor(private router:Router){

  }

  //TODO: Implement undefined guard and custom error handler
  searchRoom(event: Event){
    this.router.navigate([`room-details/${this.inputRoomNumber}`])
  }
}
