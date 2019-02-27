import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import {Promise} from "bluebird";
import { Data } from "../../core/data";
//import { exists } from "fs";

export class TestTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    
    async start(session: Session, config: UserConfig) {
        let masterId;
        let cancelled=false;
        //var self = this;
        console.log(`start\n`);
        session.on('message', processMessage);
        session.on('data', processData);
        await Promise.delay(5000);
        await session.sendAsync("stopstate");
        //let taskPath = "jh fam 1 start;go west;go northup;go north;go west;go northup;go northup;go northup;go north;go north;go north;go north;go north;go north";
        let taskPath = "jh fam 9 start";
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
        while (true) {
            console.log("check if end.. "+this.isCancellationRequested);   
            console.log("check priority.. "+cancelled);     
            if (this.isCancellationRequested||cancelled) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                break;
            }
            await Promise.delay(1000 * 10 * 1);
            await session.sendAsync("look");
        }
        console.log("end.. "+config.name);          
        await Promise.delay(1000);
        this.priority=-1;
        return;
        async function processMessage(msg: string) {
            console.log(`msg:` + msg + `\n`);
        };
        async function processData(data: Data) {
            //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            if (data.type === 'sc' && data.mp != null && data.id == masterId) {
                //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            console.log(new Date()+`kill!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`);
                await session.sendAsync(`kill ${masterId}`);
            }
            if(data.type==='die'&&data.relive==null){
                await session.sendAsync("relive");
                await wumiao(5000);
                await xiulian(1000);
                cancelled=true;
                //this.isCancellationRequested=true;
            }
            if(data.type==='items'){
                const master = data.items.find(i => i && i.name.includes('守门人'));
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
        async function wumiao(time: number) {
            await session.sendAsync("stopstate");
            await session.sendAsync("jh fam 0 start");
            await session.sendAsync("go north");
            await session.sendAsync("go north");
            await session.sendAsync("go west");
            await Promise.delay(time);
        }
        async function xiulian(time: number) {
            await session.sendAsync("stopstate");
            await session.sendAsync("jh fam 0 start");
            await Promise.delay(500);
            await session.sendAsync("go west");
            await Promise.delay(500);
            await session.sendAsync("go west");
            await Promise.delay(500);
            await session.sendAsync("go north");
            await Promise.delay(500);
            await session.sendAsync("go enter");
            await Promise.delay(500);
            await session.sendAsync("go west");
            await Promise.delay(500);
            await session.sendAsync("xiulian");
            await Promise.delay(time);
        }

    }


    
}

