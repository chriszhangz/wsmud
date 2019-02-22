import { Task } from "../task";
import { Session } from "../../core";
import { Msg,Data } from '../../core/data';
import { UserConfig } from "../interface";
import { Promise } from "bluebird";


const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。
const endJob = /你先去休息一下吧/;
const quest = /为师最近突然想尝一下<wht>包子/;
const quest2 = /我要的是<wht>包子/;
let msgs = [""];
let idOfBaoZi = '';
let shimen = 0;

export class AutoTask extends Task {

    constructor(
        private taskPath: string[],
        private masterName: string,
    ) {
        super();
        this.priority = 100;
    }

    async start(session: Session, config: UserConfig) {
        //let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        //let lastbook = new Date();
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        //const tm = "tm";
        const pty = "pty";
        const rumor = "rumor";

        var self = this;
        //let taskPath = self.taskPath;
        //let masterName = self.masterName;
        //this.priority = -1;

        async function processMessage(msg: string) {
            //console.log(msg);
            var matches;
            if ((matches = endJob.exec(msg)) != null) {
                //self.priority = -1;    
                shimen = 1;
                //console.log(new Date() + "师门完成..")
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                return;
            }
            if (msgs.length < 10) {
                msgs.push(msg);
            } else {
                msgs.shift();
                msgs.push(msg);
            }
        };
        async function processMsg(data: Msg) {
            //console.log("^^^^^:"+data.content);
            if (data.ch === rumor) {
                //console.log("****:"+data.content);//听说张无忌出现在峨嵋派-厨房一带。
                if (data.content.indexOf('听说') >= 0 && data.content.indexOf('出现') >= 0 && data.content.indexOf('踢下了擂台') < 0) {
                    var matches;
                    if ((matches = yaoyan.exec(data.content)) != null) {
                        var bossName = matches[1];
                        if(bossName.includes("火龙王")){
                            bossName='火龙王';
                        }
                        var bossPosition = matches[2];
                        let cont = ' ' + bossName + ':' + bossPosition;
                        await Promise.delay(1050);
                        await session.sendAsync(`${pty} ${cont}`);
                    }
                }
            }
            else if (data.ch === ch) {
            }
        }
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
        var CronJob = require('cron').CronJob;
        new CronJob('00 10 13 * * *', async function () {
            console.log(new Date() + "任务start!!!!!!!!!!!!!!!!!")
            await callback(self);
        }, null, true, 'America/Los_Angeles');
        
        session.removeListener('message', processMessage);
        session.removeListener('msg', processMsg);
        session.removeListener('data', processData);
        session.on('message', processMessage);
        session.on('msg', processMsg);
        session.on('data', processData);

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                session.removeListener('data', processData);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }

        async function callback(self) {
            //console.log("start..")
            await session.sendAsync("stopstate");
            for (let i = 0; i < self.taskPath.length; i++) {
                //console.log('Execute:'+cmdss[i].content);
                await session.sendAsync(self.taskPath[i]);
                await Promise.delay(500);
            }
            await Promise.delay(5050);
            await session.sendAsync("tasks");
            const master = session.world.items.find(i => i && i.name.endsWith(self.masterName))

            if (master) {
                shimen = 0;
                idOfBaoZi = '';
                //console.log("查找找包子ID..")
                while (idOfBaoZi == '') {
                    await session.sendAsync(`pack`);
                    await Promise.delay(1000);
                }
                //console.log("找到包子ID："+idOfBaoZi);
                await session.sendAsync(`${pty} 开始师门任务..`);
                while (shimen == 0) {
                    //console.log(new Date() + "excute任务..")
                    await session.sendAsync(`task sm ${master.id}`);
                    await Promise.delay(1000);
                    var found = 0;
                    //console.log(new Date() + "check任务..")
                    for (let msg in msgs) {
                        //console.log('msg..'+msgs[msg]);
                        var match;
                        if ((match = quest.exec(msgs[msg])) != null || quest2.exec(msgs[msg]) != null) {
                            //console.log(new Date() + "发现任务..")
                            msgs = [""];
                            await session.sendAsync(`task sm ${master.id} give ${idOfBaoZi}`);
                            //await Promise.delay(1000);
                            found = 1;
                            break;
                        }
                    }
                    if (found == 0) {
                        await session.sendAsync(`task sm ${master.id} giveup`);
                        //await Promise.delay(1000);
                    }
                    await Promise.delay(1000);
                }
                await session.sendAsync(`${pty} 师门任务完成，开始刷副本..`);
                //console.log(new Date() + "开始副本..")
                if (config.name != "新月") {
                    for (var i = 0; i < 20; i++) {
                        await session.sendAsync("jh fb 0 start1");
                        await session.sendAsync("cr yz/lw/shangu");
                        await session.sendAsync("cr over");
                        await Promise.delay(1000);
                    }
                } else {
                    await session.sendAsync("cr xuedao/shankou 0 20");
                }
                await session.sendAsync(`${pty} 副本完成，开始扫荡追捕..`);
                //console.log("完成副本..");
                //console.log(new Date() + "开始追捕..")
                await session.sendAsync("taskover signin");
                await Promise.delay(1000);
                if (config.name != "新月") {
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
                let zhifu = session.world.items.find(i => i && i.name.endsWith('程药发'));
                while (!zhifu) {
                    await Promise.delay(1000);
                    await session.sendAsync("jh fam 0 start");
                    await Promise.delay(500);
                    await session.sendAsync("go west");
                    await Promise.delay(500);
                    await session.sendAsync("go north");
                    await Promise.delay(500);
                    await session.sendAsync("go north");
                    await Promise.delay(2000);
                    zhifu = session.world.items.find(i => i && i.name.endsWith('程药发'));
                }
                if (zhifu) {
                    await session.sendAsync(`ask3 ${zhifu.id}`);
                    await Promise.delay(500);
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
                }
                await session.sendAsync(`${pty} 所有任务完毕，小的告退..`);
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                return;
            }
        }


    }



}


