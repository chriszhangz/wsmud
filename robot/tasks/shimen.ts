import { Session } from '../../core';
import { Data } from "../../core/data";
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";
import * as cron from "node-schedule";

const ONE_DAY_MS = 86400000;
const endJob = /你先去休息一下吧/;
const quest = /为师最近突然想尝一下<wht>包子/;
const quest2 = /我要的是<wht>包子/;
let msgs = [""];
export class ShimenTask extends Task {

    constructor(
        private taskPath: string,
        private masterName: string,
        private tokenId: string,
        firstChiefDate: Date
    ) {
        super();
        this.firstChiefTime = new Date(
            firstChiefDate.getFullYear(),
            firstChiefDate.getMonth(),
            firstChiefDate.getDate())
            .getTime();
        this.priority = 100;
    }

    firstChiefTime: number;

    basePriority: number;

    async  start(session: Session, config: UserConfig) {
        var self = this;
        async function callback() {
            await session.sendAsync("stopstate");
            await session.sendAsync(self.taskPath);
            await Promise.delay(5050);
            await session.sendAsync("tasks");
            const master = session.world.items.find(i => i && i.name.endsWith(self.masterName))

            if (master) {
                console.log(new Date() + "任务开始..")
                while (true) {
                    await session.sendAsync(`task sm ${master.id}`);
                    await Promise.delay(1000);
                    var found=0;
                    for(let msg in msgs){
                        var match;
                        if ((match = quest.exec(msgs[msg])) != null||quest2.exec(msgs[msg]) != null) {
                            msgs=[""];
                            await session.sendAsync(`task sm ${master.id} give ${self.tokenId}`);
                            await Promise.delay(1000);
                            found=1;
                            break;
                        }
                    }
                    if(found==0){
                        await session.sendAsync(`task sm ${master.id} giveup`);
                        await Promise.delay(1000);
                    }
                }

            }
   
        }

        async function processMessage(msg: string) {
            console.log(msg);
            var matches;
            if ((matches = endJob.exec(msg)) != null) {
                console.log(new Date() + "任务完成..")
                await session.sendAsync("jh fam 0 start");
                await session.sendAsync("go west");
                await session.sendAsync("go west");
                await session.sendAsync("go west");
                await session.sendAsync("wa");
                self.priority = -1;    
            }
            if(msgs.length<10){
                msgs.push(msg);
            }else{
                msgs.pop();
            }
        };
        
        async function processData(data: Data) {
            if (data.type==='dialog'&&data.dialog === "pack") {
                if(data.name.indexOf('养精丹')>=0){
                console.log(new Date() + "使用养精丹 ..");
                await session.sendAsync("use ${data.id}");
                }
            }
        };
        // cron.scheduleJob("55 0 5 * * *", async fireDate => {
        //     var isChiefDate = this.isChiefDate(fireDate);
        //     if (isChiefDate) {
        //         await callback()
        //     }
        // });
        // cron.scheduleJob("5 0 20 * * *", async fireDate => {
        //     var isChiefDate = this.isChiefDate(fireDate);
        //     if (!isChiefDate) {
        //         await callback()
        //     }
        // });
        session.on('message', processMessage);
        session.on('data', processData);
        //session.on('msg', processMsg);
        await Promise.delay(5050);
        await callback();
        this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                //session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }

    private isChiefDate(fireDate: Date) {
        const today = new Date(fireDate.getFullYear(), fireDate.getMonth(), fireDate.getDate()).getTime();
        var days = (today - this.firstChiefTime) / ONE_DAY_MS;
        var offset = (days & 1) == 0;
        console.log(`${fireDate} ${offset ? 'is' : 'is not'} chief date`);
        return offset;
    }
}


