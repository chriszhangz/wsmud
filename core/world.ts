import { User } from "./user";
import { Role, Item, Room, Exits, Task, PackDialog, ScoreDialog } from "./data";

export class World {
    room: Room;
    exits: Exits;
    roles: Role[];
    items: Item[];
    tasks: Task[];
    pack: PackDialog;
    score: ScoreDialog;
    me: User;
}