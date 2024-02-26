import { Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomFormComponent } from './components/room-form/room-form.component';

export const routes: Routes = [
    { path: `rooms`, component: RoomListComponent },
    { path: `room-form`, component: RoomFormComponent}
];
