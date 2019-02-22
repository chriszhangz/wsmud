import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import {Promise} from "bluebird";
import { Data } from "../../core/data";

export class TestTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    
    async start(session: Session, config: UserConfig) {
        let masterId;
        console.log(`start\n`);
        session.on('data', processData);
        await Promise.delay(5000);
        await session.sendAsync("stopstate");
        //await session.sendAsync("jh fam 0 start");
        //await session.sendAsync("go north");
        console.log(JSON.stringify(session.world.items, null, 4) + `\n`);
        //await session.sendAsync("kill r9ms39c437e");
        //await session.sendAsync("go south");  
            await Promise.delay(5000);

        let master = session.world.items.find(i => i && i.name.includes('守门人'));
        if (master) {
        masterId=master.id;
        }
        while(true){
            //console.log(new Date()+JSON.stringify(master, null, 4) + `\n`);
            //console.log(JSON.stringify(session.world.items, null, 4) + `\n`);
            //master = session.world.items.find(i => i && i.name.includes('邹有竦'));
            await Promise.delay(5000);
        }
        console.log("end.. "+config.name);          
        await Promise.delay(1000);
        this.priority=-1;
        return;
        async function processData(data: Data) {
            console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            if (data.type === 'sc' && data.mp != null && data.id == masterId) {
                //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            console.log(new Date()+`kill!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`);
                await session.sendAsync(`kill ${masterId}`);
            }
            if(data.type==='die'){
                await session.sendAsync("relive");
            }
        };

    }


    
}

