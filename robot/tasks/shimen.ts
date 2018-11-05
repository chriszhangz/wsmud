import { Session } from '../../core';
import { Data } from "../../core/data";
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";

const endJob = /你先去休息一下吧/;
const quest = /为师最近突然想尝一下<wht>包子/;
const quest2 = /我要的是<wht>包子/;
let shimen = 0;
let idOfBaoZi = '';
let msgs = [""];
const pty = "pty";
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
                shimen=0;
                idOfBaoZi = '';
                //console.log("查找找包子ID..")
                while(idOfBaoZi==''){
                    await session.sendAsync(`pack`);
                    await Promise.delay(1000);
                }                
                //console.log("找到包子ID："+idOfBaoZi);
                await session.sendAsync(`${pty} 开始师门任务..`);
                while (shimen==0) {
                    //console.log(new Date() + "excute任务..")
                    await session.sendAsync(`task sm ${master.id}`);
                    await Promise.delay(1000);
                    var found=0;
                    //console.log(new Date() + "check任务..")
                    for(let msg in msgs){
                        //console.log('msg..'+msgs[msg]);
                        var match;
                        if ((match = quest.exec(msgs[msg])) != null||quest2.exec(msgs[msg]) != null) {
                            //console.log(new Date() + "发现任务..")
                            msgs=[""];
                            await session.sendAsync(`task sm ${master.id} give ${idOfBaoZi}`);
                            //await Promise.delay(1000);
                            found=1;
                            break;
                        }
                    }
                    if(found==0){
                        await session.sendAsync(`task sm ${master.id} giveup`);
                        //await Promise.delay(1000);
                    }
                    await Promise.delay(1000);
                }
                await session.sendAsync(`${pty} 师门任务完成，开始刷副本..`);
                //console.log(new Date() + "开始副本..")
                for(var i=0;i<20;i++){
                    await session.sendAsync("jh fb 0 start1");
                    await session.sendAsync("cr yz/lw/shangu");
                    await session.sendAsync("cr over");
                    await Promise.delay(1000);
                }
                await session.sendAsync(`${pty} 副本完成，开始扫荡追捕..`);
                //console.log("完成副本..");
                //console.log(new Date() + "开始追捕..")
                await session.sendAsync("taskover signin");
                await Promise.delay(1000);
                await session.sendAsync("shop 0 20");
                await Promise.delay(1000);
                await session.sendAsync("jh fam 0 start");
                await Promise.delay(500);
                await session.sendAsync("go west");
                await Promise.delay(500);
                await session.sendAsync("go north");
                await Promise.delay(500);
                await session.sendAsync("go north");
                await Promise.delay(2000);
                const zhifu = session.world.items.find(i => i && i.name.endsWith('程药发'));
                if (zhifu) {
                    await session.sendAsync(`ask1 ${zhifu.id}`);
                    await Promise.delay(500);
                    await session.sendAsync(`ask2 ${zhifu.id}`);
                    await Promise.delay(500);
                    await session.sendAsync(`ask3 ${zhifu.id}`);
                    await Promise.delay(10000);
                    //console.log("完成追捕..");
                    await session.sendAsync("jh fam 0 start");
                    await session.sendAsync("go west");
                    await session.sendAsync("go west");
                    await session.sendAsync("go west");
                    await session.sendAsync("go west");
                    await session.sendAsync("wa");
                }
                await session.sendAsync(`${pty} 所有任务完毕，小的告退..`);
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                self.priority=-1;
                return;
            }
   
        }

        async function processMessage(msg: string) {
            //console.log(msg);
            var matches;
            if ((matches = endJob.exec(msg)) != null) {
                //self.priority = -1;    
                shimen=1;
                //console.log(new Date() + "师门完成..")
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                return;
            }
            if(msgs.length<10){
                msgs.push(msg);
            }else{
                msgs.shift();
                msgs.push(msg);
            }
        };
        
        async function processData(data: Data) {
            if (data.type==='dialog'&&data.dialog === "pack") {
                if(data.name&&data.name.indexOf('养精丹')>=0){
                //console.log(new Date() + "************************************使用养精丹 ..");
                await session.sendAsync(`use ${data.id}`);
                }else if(data.items){
                    for(const item in data.items){
                        if(data.items[item].name.includes('包子'))
                        {
                        //console.log(roomName+':'+items[item].name);
                        idOfBaoZi=data.items[item].id;
                        break;
                        }
                    }
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


}


