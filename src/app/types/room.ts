import { RoomSize } from "../enums/roomSize";

export interface Room {
    roomNumber: number;
    size: RoomSize;
    minibar: boolean;
}