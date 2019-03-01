import { Task } from "../task";
import { Session } from "../../core";
import { Msg, Data } from '../../core/data';
import { UserConfig } from "../interface";
import { Promise } from "bluebird";
import { appendFile } from "fs";


//const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。
const mpzStart = /击杀(\D+)，(\D+)众弟子听令，对(\D+)格杀勿论！/;
const mpzStart2 = /，众弟子听令，对(\D+)格杀勿论！/;
const mpzEnd = /和(\D+)的战斗结束了，你的门派/;
const combatStart = /想杀死你！/;
// const quest = /为师最近突然想尝一下<wht>包子/;
// const quest2 = /我要的是<wht>包子/;
// let msgs = [""];
// let idOfBaoZi = '';
// let shimen = 0;
let attackName: String;
let defenseName: String;
let die = 0;
let inCombat = 0;
let masterId;
let emei = 0;
let emei2 = 0;
let masterName;

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
        //const pty = "pty";
        //const rumor = "rumor";
        let cancelled=false;
        let fileName=`./core/rooms/`+config.name;

        //var self = this;
        //let taskPath = self.taskPath;
        //let masterName = self.masterName;
        //this.priority = -1;

        async function processMessage(msg: string) {
            await Promise.promisify(appendFile)(fileName, new Date() +`msg:` + msg + `\n`);
            var matches;
            if ((matches = mpzEnd.exec(msg)) != null) {                      
                cancelled=true;
            }
            if (msg.includes('想杀死你！')){
                await Promise.promisify(appendFile)(fileName, new Date() + `start combat!!!!!!!!!!!!!!!!! \n`);  
                inCombat=1;
                //await session.sendAsync(`perform dodge.power`);
                //await session.sendAsync(`perform force.power`);
                //await session.sendAsync(`perform force.cui`);
                //await session.sendAsync(`perform parry.yi`);
                await session.sendAsync(`perform sword.yi`);
                await session.sendAsync(`perform throwing.jiang`);
                await session.sendAsync(`perform unarmed.duo`);
                await session.sendAsync(`perform unarmed.juan`);
                while(inCombat==1){
                await Promise.delay(5000);
                await session.sendAsync(`perform force.cui`);
                await session.sendAsync(`perform force.xi`);
                await session.sendAsync(`perform force.power`);
                await session.sendAsync(`perform force.wang`);
                await session.sendAsync(`perform parry.yi`);
                await session.sendAsync(`perform sword.yi`);
                await session.sendAsync(`perform throwing.jiang`);
                await session.sendAsync(`perform unarmed.duo`);
                await session.sendAsync(`perform unarmed.juan`);
                }
            }
            if(msg.includes("只能在战斗中使用。")&&inCombat==1){                
                inCombat=0;
                await xiulian(1000);
                await Promise.promisify(appendFile)(fileName, new Date() + `combat end????? 任务end!!!!!!!!!!!!!!!!! \n`);                      
                cancelled=true; 
            }
        };
        async function processMsg(data: Msg) {

            if (data.ch === ch) {
                var matches;
                if ((matches = mpzStart.exec(data.content)) != null && (data.name == '洪七公' || data.name == '逍遥子' || data.name == '玄难' || data.name == '灭绝' || data.name == '张三丰' || data.name == '岳不群')) {
                    await Promise.promisify(appendFile)(fileName, new Date() + JSON.stringify(data, null, 4) + `\n`);
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
                    await Promise.promisify(appendFile)(fileName, attackName + `|` + defenseName + `|` + place + `\n`);
                    if(emei==1){
                    if (place != null) {
                        session.on('data', processData);
                        var taskPath;
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
                        await session.sendAsync("stopstate");
                        let taskPaths: string[] = taskPath.split(";");
                        for (let i = 0; i < taskPaths.length; i++) {
                            //console.log('Execute:'+cmdss[i].content);
                            await session.sendAsync(taskPaths[i]);
                            //await Promise.delay(100);
                        }
                        //await Promise.delay(1000);
                        // await Promise.promisify(appendFile)(fileName, new Date() + JSON.stringify(session.world.items, null, 4) +`\n`);
                        // const master = session.world.items.find(i => i && i.name.includes(masterName));
                        // if (master) {
                        //     // while (master.hp == master.max_hp) {
                        //     //     await Promise.promisify(appendFile)(fileName, new Date() + `max hap has to wait\n`);
                        //     //     await Promise.delay(3000);
                        //     // }
                        //     // await session.sendAsync(`kill ${master.id}`);
                        //     masterId = master.id;
                        //     session.on('data', processData);
                        // } else {
                        //     await Promise.promisify(appendFile)(fileName, new Date() + `can't find master go back xiulian \n`);
                        //     await session.sendAsync("stopstate");
                        //     await session.sendAsync("jh fam 0 start");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go west");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go west");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go north");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go enter");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go west");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("xiulian");
                        //     session.removeListener('message', processMessage);
                        //     session.removeListener('msg', processMsg);
                        //     session.removeListener('data', processData);
                        //     await Promise.promisify(appendFile)(fileName, new Date() + `can't find master 任务end!!!!!!!!!!!!!!!!! \n`);
                        //     //self.priority=-1;
                        //     //return;
                        // }
                    } else {
                        await Promise.promisify(appendFile)(fileName, new Date() + `place = null 任务end!!!!!!!!!!!!!!!!! \n`);                        
                        cancelled=true;
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
                    await Promise.promisify(appendFile)(fileName, attackName + `||` + defenseName + `||` + place + `\n`);
                    if(emei2==1){
                    if (place != null) {
                        session.on('data', processData);
                        taskPath = "jh fam 2 start;go north;go north;go northwest;go northeast;go north;go north";
                        masterName = "玄难";
                        await session.sendAsync("stopstate");
                        let taskPaths: string[] = taskPath.split(";");
                        for (let i = 0; i < taskPaths.length; i++) {
                            //console.log('Execute:'+cmdss[i].content);
                            await session.sendAsync(taskPaths[i]);
                            //await Promise.delay(100);
                        }
                        //await Promise.delay(1000);
                        //await Promise.promisify(appendFile)(fileName, new Date() + JSON.stringify(session.world.items, null, 4) +`\n`);
                        //const master = session.world.items.find(i => i && i.name.includes(masterName));
                        // if (master) {
                        //     // while (master.hp == master.max_hp) {
                        //     //     await Promise.promisify(appendFile)(fileName, new Date() + master.name + `max hap has to wait\n`);
                        //     //     await Promise.delay(3000);
                        //     // }
                        //     // await session.sendAsync(`kill ${master.id}`);
                        //     masterId = master.id;
                        //     session.on('data', processData);
                        // } else {
                        //     await Promise.promisify(appendFile)(fileName, new Date() + `can't find master go back xiulian \n`);
                        //     await session.sendAsync("stopstate");
                        //     await session.sendAsync("jh fam 0 start");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go west");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go west");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go north");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go enter");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("go west");
                        //     await Promise.delay(500);
                        //     await session.sendAsync("xiulian");
                        //     session.removeListener('message', processMessage);
                        //     session.removeListener('msg', processMsg);
                        //     session.removeListener('data', processData);
                        //     await Promise.promisify(appendFile)(fileName, new Date() + `can't find master 任务end!!!!!!!!!!!!!!!!! \n`);
                        //     //self.priority=-1;
                        //     //return;
                        // }
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
            if(data.type==='die'&&data.relive==null){
                die=1;
                inCombat=0;
                await session.sendAsync("relive");
                await Promise.delay(50000);
                await xiulian(1000);
                            die =0;
                            await Promise.promisify(appendFile)(fileName, new Date() + `relive 任务end!!!!!!!!!!!!!!!!! \n`);                      
                            cancelled=true;
            }
            if(data.type==='items'){
                const master = data.items.find(i => i && i.name.includes(masterName));
                if (master) {
                    // while (master.hp == master.max_hp) {
                    //     await Promise.promisify(appendFile)(fileName, new Date() + master.name + `max hap has to wait\n`);
                    //     await Promise.delay(3000);
                    // }
                    // await session.sendAsync(`kill ${master.id}`);
                    masterId = master.id;
                    //await Promise.promisify(appendFile)(fileName, new Date() + `Find Master:`+JSON.stringify(master, null, 4)+`\n`);
                    //await session.sendAsync(`kill ${masterId}`);
                await session.sendAsync(`perform sword.yi`);
                await session.sendAsync(`perform throwing.jiang`);
                await session.sendAsync(`perform unarmed.duo`);
                await session.sendAsync(`perform unarmed.juan`);
                }
            }
            if (data.type === 'combat' && data.end === 1&&die!=1) {
                inCombat=0;
                await wumiao(15000);
                await xiulian(1000);
                await Promise.promisify(appendFile)(fileName, new Date() + `combat end 任务end!!!!!!!!!!!!!!!!! \n`);                      
                cancelled=true;
                //self.priority=-1;
                //return;
            }
            if (data.type === 'sc' && data.hp != null&&data.id==masterId&&inCombat==0) {
                await Promise.promisify(appendFile)(fileName, new Date() + `detect hp loose start combat!!!!!!!!!!!!!!!!! \n`);  
                inCombat=1;
                //await session.sendAsync(`kill ${masterId}`);
                //await session.sendAsync(`perform dodge.power`);
                //await session.sendAsync(`perform force.power`);
                //await session.sendAsync(`perform force.cui`);
                //await session.sendAsync(`perform parry.yi`);
                await session.sendAsync(`perform sword.yi`);
                await session.sendAsync(`perform throwing.jiang`);
                await session.sendAsync(`perform unarmed.duo`);
                await session.sendAsync(`perform unarmed.juan`);
                // while(inCombat==1){
                // await Promise.delay(5000);
                // await session.sendAsync(`perform force.cui`);
                // await session.sendAsync(`perform parry.yi`);
                // await session.sendAsync(`perform sword.yi`);
                // await session.sendAsync(`perform throwing.jiang`);
                // await session.sendAsync(`perform unarmed.duo`);
                // await session.sendAsync(`perform unarmed.juan`);
                // }
                //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
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
        // var CronJob = require('cron').CronJob;
        // new CronJob('00 55 01,02,03,04,05 * * *', async function () {
        //     await Promise.promisify(appendFile)(fileName, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
        //     //console.log(new Date() + "任务start!!!!!!!!!!!!!!!!!")
        //     inCombat=0;
        //     session.on('msg', processMsg);
        //     session.on('message', processMessage);
        //     //await callback(self);
        // }, null, true, 'America/Los_Angeles');

        session.removeListener('message', processMessage);
        session.removeListener('msg', processMsg);
        session.removeListener('data', processData);
        //session.on('message', processMessage);
        //session.on('msg', processMsg);
        //session.on('data', processData);
        await Promise.promisify(appendFile)(fileName, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
        inCombat=0;
        session.on('msg', processMsg);
        session.on('message', processMessage);

        while (true) {
            if (this.isCancellationRequested||cancelled) {
                session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                session.removeListener('data', processData);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
        this.priority=-1;
        return;


    }



}


