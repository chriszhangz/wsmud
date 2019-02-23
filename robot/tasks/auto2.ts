import { Task } from "../task";
import { Session } from "../../core";
import { Msg, Data } from '../../core/data';
import { UserConfig } from "../interface";
import { Promise } from "bluebird";
import { appendFile } from "fs";


//const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。
const mpzStart = /击杀(\D+)，(\D+)众弟子听令，对(\D+)格杀勿论！/;
const mpzStart2 = /，众弟子听令，对(\D+)格杀勿论！/;
const quest = /为师最近突然想尝一下<wht>包子/;
const quest2 = /我要的是<wht>包子/;
let msgs = [""];
let idOfBaoZi = '';
let shimen = 0;
let attackName: String;
let defenseName: String;
let die = 0;
let inCombat = 0;
let masterId;
let emei = 0;
let emei2 = 0;

export class AutoTask2 extends Task {

    constructor() {
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
        //const rumor = "rumor";

        //var self = this;
        //let taskPath = self.taskPath;
        //let masterName = self.masterName;
        //this.priority = -1;

        async function processMessage(msg: string) {
            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, `msg:` + msg + `\n`);
            //console.log(msg);
            // var matches;
            // if ((matches = endJob.exec(msg)) != null) {
            //     //self.priority = -1;    
            //     shimen = 1;
            //     //console.log(new Date() + "师门完成..")
            //     //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
            //     return;
            // }
            // if (msgs.length < 10) {
            //     msgs.push(msg);
            // } else {
            //     msgs.shift();
            //     msgs.push(msg);
            // }

        };
        async function processMsg(data: Msg) {

            if (data.ch === ch) {
                var matches;
                if ((matches = mpzStart.exec(data.content)) != null && (data.name == '洪七公' || data.name == '逍遥子' || data.name == '玄难' || data.name == '灭绝' || data.name == '张三丰' || data.name == '岳不群')) {
                    await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + JSON.stringify(data, null, 4) + `\n`);
                    var place;
                    attackName = matches[2];
                    defenseName = matches[3];
                    emei=0;
                    if (attackName.includes('峨眉')) {
                        place = defenseName.replace('派', '').replace('弟子', '');
                        emei=1;
                    }
                    if (defenseName.includes('峨眉')) {
                        place = attackName.replace('派', '');
                        emei=1;
                    }
                    await Promise.promisify(appendFile)(`./core/rooms/test1.json`, attackName + `|` + defenseName + `|` + place + `\n`);
                    if(emei==1){
                    if (place != null) {
                        var taskPath;
                        var masterName;
                        switch (place) {
                            case '丐帮':
                                taskPath = "jh fam 6 start;go down;go east;go east;go east;go east;go east;go up";
                                masterName = "洪七公";
                                break;
                            case '逍遥':
                                taskPath = "jh fam 5 start;go down;go down";
                                masterName = "逍遥子";
                                break;
                            case '少林':
                                taskPath = "jh fam 2 start;go north;go north;go northwest;go northeast;go north;go north";
                                masterName = "玄难";
                                break;
                            case '武当':
                                taskPath = "jh fam 1 start;go west;go northup;go north;go west;go northup;go northup;go northup;go north;go north;go north;go north;go north;go north";
                                masterName = "张三丰";
                                break;
                            case '华山':
                                taskPath = "jh fam 3 start;go westup;go north;go north";
                                masterName = "岳不群";
                                break;
                        }
                        let taskPaths: string[] = taskPath.split(";");
                        for (let i = 0; i < taskPaths.length; i++) {
                            //console.log('Execute:'+cmdss[i].content);
                            await session.sendAsync(taskPaths[i]);
                            //await Promise.delay(100);
                        }
                        //await Promise.delay(1000);
                        const master = session.world.items.find(i => i && i.name.endsWith(masterName));
                        if (master) {
                            // while (master.hp == master.max_hp) {
                            //     await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `max hap has to wait\n`);
                            //     await Promise.delay(3000);
                            // }
                            // await session.sendAsync(`kill ${master.id}`);
                            masterId = master.id;
                            session.on('data', processData);
                        } else {
                            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `can't find master go back xiulian \n`);
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
                            session.removeListener('message', processMessage);
                            session.removeListener('msg', processMsg);
                            session.removeListener('data', processData);
                            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `can't find master 任务end!!!!!!!!!!!!!!!!! \n`);
                            //self.priority=-1;
                            //return;
                        }
                    } else {
                        session.removeListener('message', processMessage);
                        session.removeListener('msg', processMsg);
                        session.removeListener('data', processData);
                        await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `place = null 任务end!!!!!!!!!!!!!!!!! \n`);
                    }
                }
                } else if ((matches = mpzStart2.exec(data.content)) != null && (data.name == '洪七公' || data.name == '逍遥子' || data.name == '玄难' || data.name == '灭绝' || data.name == '张三丰' || data.name == '岳不群')) {
                    attackName = '少林';
                    defenseName = matches[1];
                    emei2=0;
                    if (defenseName.includes('峨眉')) {
                        place = attackName;
                        emei2=1;
                    }
                    await Promise.promisify(appendFile)(`./core/rooms/test1.json`, attackName + `||` + defenseName + `||` + place + `\n`);
                    if(emei2==1){
                    if (place != null) {
                        taskPath = "jh fam 2 start;go north;go north;go northwest;go northeast;go north;go north";
                        masterName = "玄难";
                        let taskPaths: string[] = taskPath.split(";");
                        for (let i = 0; i < taskPaths.length; i++) {
                            //console.log('Execute:'+cmdss[i].content);
                            await session.sendAsync(taskPaths[i]);
                            //await Promise.delay(100);
                        }
                        //await Promise.delay(1000);
                        const master = session.world.items.find(i => i && i.name.endsWith(masterName));
                        if (master) {
                            // while (master.hp == master.max_hp) {
                            //     await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + master.name + `max hap has to wait\n`);
                            //     await Promise.delay(3000);
                            // }
                            // await session.sendAsync(`kill ${master.id}`);
                            masterId = master.id;
                            session.on('data', processData);
                        } else {
                            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `can't find master go back xiulian \n`);
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
                            session.removeListener('message', processMessage);
                            session.removeListener('msg', processMsg);
                            session.removeListener('data', processData);
                            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `can't find master 任务end!!!!!!!!!!!!!!!!! \n`);
                            //self.priority=-1;
                            //return;
                        }
                    }
                }
                }

            }
        }
        async function processData(data: Data) {
            // if (data.type==='dialog'&&data.dialog === "pack") {
            //     if(data.name&&data.name.indexOf('养精丹')>=0){
            //     //console.log(new Date() + "************************************使用养精丹 ..");
            //     await session.sendAsync(`use ${data.id}`);
            //     }else if(data.items){
            //         for(const item in data.items){
            //             if(data.items[item].name.includes('包子'))
            //             {
            //             //console.log(roomName+':'+items[item].name);
            //             idOfBaoZi=data.items[item].id;
            //             break;
            //             }
            //         }
            //     }
            // }
            if(data.type==='die'){
                die=1;
                inCombat=0;
                await session.sendAsync("relive");
                await Promise.delay(20000);
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
                            session.removeListener('message', processMessage);
                            session.removeListener('msg', processMsg);
                            session.removeListener('data', processData);
                            die =0;
                            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `relive 任务end!!!!!!!!!!!!!!!!! \n`);
            }
            if (data.type === 'combat' && data.end === 1&&die!=1) {
                inCombat=0;
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
                session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                session.removeListener('data', processData);
                await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `combat end 任务end!!!!!!!!!!!!!!!!! \n`);
                //self.priority=-1;
                //return;
            }
            if (data.type === 'sc' && data.hp != null&&data.id==masterId&&inCombat==0) {
                await session.sendAsync(`kill ${masterId}`);
                inCombat=1;
                //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            }
        };
        var CronJob = require('cron').CronJob;
        new CronJob('00 55 01,02,03,04 * * *', async function () {
            await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
            //console.log(new Date() + "任务start!!!!!!!!!!!!!!!!!")
            inCombat=0;
            session.on('msg', processMsg);
            session.on('message', processMessage);
            //await callback(self);
        }, null, true, 'America/Los_Angeles');

        session.removeListener('message', processMessage);
        session.removeListener('msg', processMsg);
        session.removeListener('data', processData);
        //session.on('message', processMessage);
        //session.on('msg', processMsg);
        //session.on('data', processData);

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
                } else {
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
                    } else {
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


