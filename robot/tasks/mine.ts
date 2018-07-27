import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import {Promise} from "bluebird";

export class MineTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }
    private cmds: string[] = ["jh fam 1 start","go north"];
    async start(session: Session, config: UserConfig) {
        for (let i = 0; i < this.cmds.length; i++) {
            await session.sendAsync(this.cmds[i]);
            await Promise.delay(1000);
            let roomData = session.world.room;
            console.log(roomData.name);
            await Promise.delay(1000);
            let items = session.world.items;
            for(const item in items){
                if(items[item].p!=1)
                console.log(items[item].name);
            }
        }
        this.priority = -1;

    }
}