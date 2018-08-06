import { Task } from "../task";
import { Session } from "../../core";
import { Msg } from '../../core/data';
import { UserConfig } from "../interface";
import {Promise} from "bluebird";

export class TestTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    
    async start(session: Session, config: UserConfig) {
        await session.sendAsync("stopstate");
        //await session.sendAsync("jh fam 0 start");
        await session.sendAsync("go north");  
        console.log("end.. "+config.name);          
        await Promise.delay(1000);
        this.priority=-1;
        return;

    }


    
}

