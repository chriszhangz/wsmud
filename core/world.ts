import { User } from "./user";
import { Role, Item, Room, Exits, Task } from "./data";

export class World {
    room: Room;
    exits: Exits;
    roles: Role[];
    items: Item[];
    tasks: Task[];
    me: User;
}