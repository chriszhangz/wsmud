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
        let taskPath = "jh fam 1 start;go west;go northup;go north;go west;go northup;go northup;go northup;go north;go north;go north;go north;go north;go north";
        let taskPaths: string[] = taskPath.split(";");
                        for (let i = 0; i < taskPaths.length; i++) {
                            //console.log('Execute:'+cmdss[i].content);
                            await session.sendAsync(taskPaths[i]);
                            //await Promise.delay(100);
                        }
        //await session.sendAsync("jh fam 0 start");
        //await session.sendAsync("go north");
        console.log("mastttter:"+JSON.stringify(session.world.items, null, 4) + `\n`);
        //await session.sendAsync("kill r9ms39c437e");
        //await session.sendAsync("go south");  
            //await Promise.delay(5000);
            //console.log("mastttter2:"+JSON.stringify(session.world.items, null, 4) + `\n`);

        let master = session.world.items.find(i => i && i.name.includes('张三丰'));
        if (master) {
        masterId=master.id;
        console.log(JSON.stringify(master, null, 4) + `\n`);
        }else{
            console.log(`can't find master \n`);
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
            if(data.type==='items'){
                const master = data.items.find(i => i && i.name.includes('张三丰'));
                if (master) {
                    // while (master.hp == master.max_hp) {
                    //     await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + master.name + `max hap has to wait\n`);
                    //     await Promise.delay(3000);
                    // }
                    // await session.sendAsync(`kill ${master.id}`);
                    masterId = master.id;
                    console.log(new Date() + `Find Master:`+JSON.stringify(master, null, 4)+`\n`);
                    await session.sendAsync(`kill ${masterId}`);
                }
            }
        };

    }


    
}

