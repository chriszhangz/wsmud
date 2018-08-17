import { Task } from "../task";
import { Session } from "../../core";
import { Msg } from '../../core/data';
import { UserConfig } from "../interface";
import {Promise} from "bluebird";

export class XiyanTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

 
    async start(session: Session, config: UserConfig) {

        const sys = "sys";


        async function processMsg(data: Msg) {
            //console.log("^^^^^:"+data.content);
            if (data.ch === sys) {
               //console.log("****:"+data.content);
                if (data.content.indexOf('婚庆主持') >= 0 && data.content.indexOf('婚礼将在一分钟后开始') >= 0) {
                    console.log('Found wedding...');
                    await session.sendAsync("stopstate");
                    await Promise.delay(5000);
                    await session.sendAsync("jh fam 0 start");
                    await session.sendAsync("go north");
                    await session.sendAsync("go north");
                    await session.sendAsync("go east");
                    session.on('message', processMessage);    
                    await Promise.delay(2000);
                    const waiter = session.world.items.find(i => i && i.name.endsWith('店小二'));
                    if(waiter){
                        console.log('Found waiter...');
                        await session.sendAsync("go up");
                        await session.sendAsync(`give ${waiter.id} 10000 money`);
                        await Promise.delay(2000);
                        let table = session.world.items.find(i => i && i.name.indexOf('婚宴礼桌')>-1);
                        let waitTimes = 0;
                        while(table==null){       
                                     
                            console.log('Wait table...'+waitTimes);
                            await session.sendAsync("go up");
                            await session.sendAsync(`give ${waiter.id} 10000 money`);
                            if(waitTimes>24){      
                                console.log('Can\'t find table...');
                                break;
                            }
                            await Promise.delay(5000);
                            table = session.world.items.find(i => i && i.name.indexOf('婚宴礼桌')>-1);
                            waitTimes++;
                        }
                        if(table){
                            console.log('Found table...');
                            await session.sendAsync(`select ${table.id}`);
                            await Promise.delay(500);
                            await session.sendAsync(`get all from ${table.id}`);
                            await Promise.delay(500);
                        }
                    }
                    session.removeListener('message', processMessage);
                    await session.sendAsync("jh fam 0 start");
                    await session.sendAsync("go west");
                    await session.sendAsync("go west");
                    await session.sendAsync("go west");
                    await session.sendAsync("go west");
                    await session.sendAsync("wa");
                    console.log('Get foods finished...');
                }
           }
       }

        session.on('msg', processMsg);

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }

        async function processMessage(msg: string) {
            console.log('got msg...'+msg);
        };
    }


    
}

