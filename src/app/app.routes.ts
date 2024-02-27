import { Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomCreateFormComponent } from './components/room-create-form/room-create-form.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomChangeFormComponent } from './components/room-change-form/room-change-form.component';

export const routes: Routes = [
    {   
        path: `room-list`, 
        component: RoomListComponent 
    },
    {   
        path: `room-form`, 
        component: RoomCreateFormComponent
    },
    {   path: `room-details/:roomNumber`, 
        component: RoomDetailsComponent,
        children: [
            {    
                path: `room-change-form`, 
                component: RoomChangeFormComponent
            }
        ]
    }
];
