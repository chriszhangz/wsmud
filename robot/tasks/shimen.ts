import { Session } from '../../core';
import { Data } from "../../core/data";
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";

const endJob = /你先去休息一下吧/;
const quest = /为师最近突然想尝一下<wht>包子/;
const quest2 = /我要的是<wht>包子/;
const pty = "pty";
export class ShimenTask extends Task {

    constructor(
        private taskPath: string,
        private masterName: string,
        //private tokenId: string,
        //firstChiefDate: Date
    ) {
        super();
        this.priority = 100;
    }

    firstChiefTime: number;

    basePriority: number;

    async  start(session: Session, config: UserConfig) {
        var self = this;
        let shimen = 0;
        let doingShimen = 0;
        let doingZhuibu = 0;
        let idOfBaoZi = '';
        let msgs = [""];
        async function callback() {
            //await session.sendAsync("setting off_move 1");
            //await session.sendAsync("setting no_message 1");
            //await session.sendAsync("setting no_combatmsg 1");
            let taskPaths: string[] = self.taskPath.split(";");

            while(doingShimen==0){
                await session.sendAsync("stopstate");
                await Promise.delay(1000);
                for (let i = 0; i < taskPaths.length; i++) {
                    //console.log('Execute:'+cmdss[i].content);
                    await session.sendAsync(taskPaths[i]);
                    await Promise.delay(500);
                }
                await Promise.delay(10000);
            }
            //await session.sendAsync(self.taskPath);
            // await Promise.delay(5050);
            // await session.sendAsync("tasks");
            // const master = session.world.items.find(i => i && i.name.endsWith(self.masterName))

            // if (master) {                
            //     shimen=0;
            //     idOfBaoZi = '';
            //     //console.log("查找找包子ID..")
            //     while(idOfBaoZi==''){
            //         await session.sendAsync(`pack`);
            //         await Promise.delay(1000);
            //     }                
            //     //console.log("找到包子ID："+idOfBaoZi);
            //     await session.sendAsync(`${pty} 开始师门任务..`);
            //     while (shimen==0) {
            //         //console.log(new Date() + "excute任务..")
            //         await session.sendAsync(`task sm ${master.id}`);
            //         await Promise.delay(1000);
            //         var found=0;
            //         //console.log(new Date() + "check任务..")
            //         for(let msg in msgs){
            //             //console.log('msg..'+msgs[msg]);
            //             var match;
            //             if ((match = quest.exec(msgs[msg])) != null||quest2.exec(msgs[msg]) != null) {
            //                 //console.log(new Date() + "发现任务..")
            //                 msgs=[""];
            //                 await session.sendAsync(`task sm ${master.id} give ${idOfBaoZi}`);
            //                 //await Promise.delay(1000);
            //                 found=1;
            //                 break;
            //             }
            //         }
            //         if(found==0){
            //             await session.sendAsync(`task sm ${master.id} giveup`);
            //             //await Promise.delay(1000);
            //         }
            //         await Promise.delay(1000);
            //     }
            //     await session.sendAsync(`${pty} 师门任务完成，开始刷副本..`);
            //     //console.log(new Date() + "开始副本..")
            //     if (config.name == "新月") {
            //         await session.sendAsync("cr xuedao/shankou 0 20");
            //         await Promise.delay(20000);
            //     }else if(config.name!="赫连侃璟"){
            //     for(var i=0;i<20;i++){
            //         await session.sendAsync("jh fb 0 start1");
            //         await session.sendAsync("cr yz/lw/shangu");
            //         await session.sendAsync("cr over");
            //         await Promise.delay(1000);
            //     }
            //     }
            //     await session.sendAsync(`${pty} 副本完成，开始扫荡追捕..`);
            //     //console.log("完成副本..");
            //     //console.log(new Date() + "开始追捕..")
            //     await session.sendAsync("taskover signin");
            //     await Promise.delay(1000);
            //     if (config.name != "新月") {
            //         await session.sendAsync("shop 0 20");
            //     }else{
            //         await session.sendAsync("shop 0 40");
            //     }
            //     await Promise.delay(1000);
            //     await session.sendAsync("jh fam 0 start");
            //     await Promise.delay(500);
            //     await session.sendAsync("go west");
            //     await Promise.delay(500);
            //     await session.sendAsync("go north");
            //     await Promise.delay(500);
            //     await session.sendAsync("go north");
            //     await Promise.delay(2000);
            //     const zhifu = session.world.items.find(i => i && i.name.endsWith('程药发'));
            //     if (zhifu) {
            //         await session.sendAsync(`ask3 ${zhifu.id}`);
            //         await Promise.delay(10500);
            //         await session.sendAsync(`ask1 ${zhifu.id}`);
            //         await Promise.delay(500);
            //         await session.sendAsync(`ask2 ${zhifu.id}`);
            //         await Promise.delay(500);
            //         await session.sendAsync(`ask3 ${zhifu.id}`);
            //         await Promise.delay(10000);
            //         //console.log("完成追捕..");
            //         if (config.name != "新月") {
            //             await session.sendAsync("wakuang");
            //         }else{
            //             await session.sendAsync("jh fam 0 start");
            //             await Promise.delay(500);
            //             await session.sendAsync("go west");
            //             await Promise.delay(500);
            //             await session.sendAsync("go west");
            //             await Promise.delay(500);
            //             await session.sendAsync("go north");
            //             await Promise.delay(500);
            //             await session.sendAsync("go enter");
            //             await Promise.delay(500);
            //             await session.sendAsync("go west");
            //             await Promise.delay(500);
            //             await session.sendAsync("xiulian");

            //         }
            //     }
            //     await session.sendAsync(`${pty} 所有任务完毕，小的告退..`);
            //     //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
            //     self.priority=-1;
            //     session.removeListener('message', processMessage);
            //     session.removeListener('data', processData);
            //     return;
            // }
   
            await Promise.delay(1000*60*9);
            if (config.name != "七羽") {
                await session.sendAsync("wakuang");
            }else{
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

            }
            self.priority=-1;
            return;
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
            if(data.type==='items'){
                const master = data.items.find(i => i && i.name.includes(self.masterName));
                if (master&&shimen==0&&doingShimen==0) {
                    //console.log('data='+JSON.stringify(data,null,4));
                    shimen=0;
                    doingShimen=1;
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
                        //await Promise.delay(1000);
                        await Promise.delay(500);
                        await session.sendAsync(`task sm ${master.id}`);
                        await Promise.delay(500);
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
                        //await Promise.delay(1000);
                    }
                    await session.sendAsync(`${pty} 师门任务完成，开始刷副本..`);
                    //console.log(new Date() + "开始副本..")
                    if (config.name == "七羽") {
                        //await session.sendAsync("cr gumu/gumukou 0 20");
                        //await Promise.delay(20000);
                    }else if(config.name!="赫连侃璟"){
                    for(var i=0;i<20;i++){
                        await session.sendAsync("jh fb 0 start1");
                        await session.sendAsync("cr yz/lw/shangu");
                        await session.sendAsync("cr over");
                        await Promise.delay(1000);
                    }
                    }
                    await session.sendAsync(`${pty} 副本完成，开始扫荡追捕..`);
                    //console.log("完成副本..");
                    //console.log(new Date() + "开始追捕..")
                    await session.sendAsync("taskover signin");
                    await Promise.delay(1000);
                    if (config.name != "七羽") {
                        await session.sendAsync("shop 0 20");
                    }else{
                        await session.sendAsync("shop 0 40");
                    }
                    await Promise.delay(1000);
                    await session.sendAsync("jh fam 0 start");
                    await Promise.delay(500);
                    await session.sendAsync("go west");
                    await Promise.delay(500);
                    await session.sendAsync("go north");
                    await Promise.delay(500);
                    await session.sendAsync("go north");
                    await Promise.delay(2000);
                }
                const zhifu = data.items.find(i => i && i.name.endsWith('程药发'));
                if (zhifu&&doingZhuibu==0) {
                    doingZhuibu=1;
                    await session.sendAsync(`ask3 ${zhifu.id}`);
                    await Promise.delay(10500);
                    await session.sendAsync(`ask1 ${zhifu.id}`);
                    await Promise.delay(500);
                    await session.sendAsync(`ask2 ${zhifu.id}`);
                    await Promise.delay(500);
                    await session.sendAsync(`ask3 ${zhifu.id}`);
                    await Promise.delay(10000);
                    //console.log("完成追捕..");
                    if (config.name != "新月") {
                        await session.sendAsync("wakuang");
                    }else{
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

                    }
                    
                await session.sendAsync(`${pty} 所有任务完毕，小的告退..`);
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                self.priority=-1;
                session.removeAllListeners('message');
                session.removeAllListeners('data');
                return;
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
        session.removeAllListeners('message');
        session.removeAllListeners('data');
        //session.removeAllListeners('msg');
        session.on('message', processMessage);
        session.on('data', processData);
        //session.on('msg', processMsg);
        await Promise.delay(5050);
        await callback();
        //this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeAllListeners('message');
                session.removeAllListeners('data');
                //session.removeAllListeners('msg');
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }


}


