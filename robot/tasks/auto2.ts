import { Task } from "../task";
import { Session } from "../../core";
import { Msg, Data } from '../../core/data';
import { UserConfig } from "../interface";
import { Promise } from "bluebird";
import { appendFile } from "fs";
import { addListener } from "cluster";


//const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。
const mpzStart = /击杀(\D+)，(\D+)众弟子听令，对(\D+)格杀勿论！/;
const mpzStart2 = /，众弟子听令，对(\D+)格杀勿论！/;
const mpzEnd = /和(\D+)的战斗结束了，你的门派/;
//const combatStart = /想杀死你！/;
// const quest = /为师最近突然想尝一下<wht>包子/;
// const quest2 = /我要的是<wht>包子/;
// let msgs = [""];
// let idOfBaoZi = '';
// let shimen = 0;

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
        let cancelled = false;
        let biguan = false;
        let fileName = `./core/rooms/` + config.name;
        let attackName: String;
        let defenseName: String;
        let die = 0;
        let inCombat = 0;
        let masterId;
        let emei = 0;
        let emei2 = 0;
        let masterName;
        let dataListener = 0;

        //var self = this;
        //let taskPath = self.taskPath;
        //let masterName = self.masterName;
        //this.priority = -1;

        async function processMessage(msg: string) {
            await Promise.promisify(appendFile)(fileName, new Date() + `msg:` + msg + `\n`);
            var matches;
            if ((matches = mpzEnd.exec(msg)) != null) {
                await xiulian(1000);
                cancelled = true;
            }
            if (msg.includes('想杀死你！') && inCombat == 0) {
                inCombat = 1;
                await Promise.promisify(appendFile)(fileName, new Date() + `start combat!!!!!!!!!!!!!!!!! \n`);
                //await session.sendAsync(`perform dodge.power`);
                //await session.sendAsync(`perform force.power`);
                //await session.sendAsync(`perform force.cui`);
                //await session.sendAsync(`perform parry.yi`);
                await session.sendAsync(`perform force.power`);
                await session.sendAsync(`perform force.wang`);
                await session.sendAsync(`perform sword.yi`);
                await session.sendAsync(`perform throwing.jiang`);
                await session.sendAsync(`perform unarmed.duo`);
                await session.sendAsync(`perform unarmed.juan`);
                while (inCombat == 1) {
                    await Promise.delay(5000);
                    await session.sendAsync(`perform force.cui`);
                    await session.sendAsync(`perform force.xi`);
                    await session.sendAsync(`perform parry.yi`);
                    await session.sendAsync(`perform parry.wu`);
                    await session.sendAsync(`perform sword.yi`);
                    await session.sendAsync(`perform throwing.jiang`);
                    await session.sendAsync(`perform unarmed.duo`);
                    await session.sendAsync(`perform unarmed.juan`);
                }
            }
            if ((msg.includes("只能在战斗中使用。") || msg.includes("这里不允许战斗。")) && inCombat == 1) {
                inCombat = 0;
                await Promise.delay(5000);
                await xiulian(1000);
                await Promise.promisify(appendFile)(fileName, new Date() + `combat end????? 任务end!!!!!!!!!!!!!!!!! \n`);
                cancelled = true;
            }
            if (msg.includes("这里不能修炼。")) {
                await Promise.promisify(appendFile)(fileName, new Date() + `这里不能修炼。????? 执行修炼任务! \n`);
                inCombat = 0;
                await Promise.delay(5000);
                await xiulian(1000);
                await Promise.promisify(appendFile)(fileName, new Date() + ` 执行修炼任务完毕! 任务end!!!!!!!!!!!!!!!!! \n`);
                cancelled = true;
            }
        };
        async function processMsg(data: Msg) {

            if (data.ch === ch) {
                var matches;
                if ((matches = mpzStart.exec(data.content)) != null && (data.name == '洪七公' || data.name == '逍遥子' || data.name == '玄难' || data.name == '灭绝' || data.name == '张三丰' || data.name == '岳不群')) {
                    await Promise.promisify(appendFile)(fileName, new Date() + JSON.stringify(data, null, 4) + `\n`);
                    var place;
                    var taskPath;
                    attackName = matches[2];
                    defenseName = matches[3];
                    emei = 0;
                    if (attackName.includes('峨眉')) {
                        place = defenseName.replace('派', '').replace('弟子', '');
                        emei = 1;
                    }
                    if (defenseName.includes('峨眉')) {
                        place = attackName.replace('派', '');
                        emei = 1;
                    }
                    await Promise.promisify(appendFile)(fileName, attackName + `|` + defenseName + `|` + place + `\n`);
                    if (config.name == '咬人的豆包') {
                        if (inCombat == 0) {
                            var youxi = 0;
                            if (attackName.includes("丐帮") || defenseName.includes("丐帮")) {
                                youxi=1;
                                if(dataListener==0){
                                    dataListener=1;
                                    session.on('data', processData);
                                }
                                taskPath = "jh fam 6 start;go down;go east;go east;go east;go east;go east;go up";
                                masterName = "洪七公";
                            } else if (attackName.includes("逍遥") || defenseName.includes("逍遥")) {
                                youxi=1;
                                if(dataListener==0){
                                    dataListener=1;
                                    session.on('data', processData);
                                }
                                taskPath = "jh fam 5 start;go down;go down";
                                masterName = "逍遥子";
                            }
                            if(youxi==1){
                                cancelled = false;
                                await session.sendAsync("stopstate");
                                let taskPaths: string[] = taskPath.split(";");
                                for (let i = 0; i < taskPaths.length; i++) {
                                    //console.log('Execute:'+cmdss[i].content);
                                    await session.sendAsync(taskPaths[i]);
                                    //await Promise.delay(100);
                                }
                            }else{

                            }
                        }
                    } else {
                        if (emei == 1) {
                            if (place != null) {
                                session.on('data', processData);
                                //var taskPath;
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
                            } else {
                                await Promise.promisify(appendFile)(fileName, new Date() + `place = null 任务end!!!!!!!!!!!!!!!!! \n`);
                                await xiulian(1000);
                                cancelled = true;
                            }
                        }
                    }
                } else if ((matches = mpzStart2.exec(data.content)) != null && (data.name == '洪七公' || data.name == '逍遥子' || data.name == '玄难' || data.name == '灭绝' || data.name == '张三丰' || data.name == '岳不群')) {
                    attackName = '少林';
                    defenseName = matches[1];
                    emei2 = 0;
                    if (defenseName.includes('峨眉')) {
                        place = attackName;
                        emei2 = 1;
                    }
                    await Promise.promisify(appendFile)(fileName, attackName + `||` + defenseName + `||` + place + `\n`);
                    if (emei2 == 1) {
                        if (place != null&&config.name != '咬人的豆包') {
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
            if (data.type === 'die' && data.relive == null) {
                die = 1;
                inCombat = 0;
                await session.sendAsync("relive");
                await Promise.delay(10000);
                inCombat = 0;
                await session.sendAsync("relive");
                await Promise.delay(20000);
                inCombat = 0;
                await session.sendAsync("relive");
                await Promise.delay(20000);
                await xiulian(1000);
                die = 0;
                await Promise.promisify(appendFile)(fileName, new Date() + `relive 任务end!!!!!!!!!!!!!!!!! \n`);
                cancelled = true;
            }
            if (data.type === 'items' && inCombat == 0) {
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
                    if (config.name == '咬人的豆包') {
                        inCombat = 1;
                        await session.sendAsync(`kill ${master.id}`);
                        await session.sendAsync(`perform force.cui`);
                        await session.sendAsync(`perform blade.shi`);
                        await session.sendAsync(`perform blade.xue`);
                        await session.sendAsync(`perform unarmed.liu`);
                        await session.sendAsync(`perform unarmed.qi`);
                        await session.sendAsync(`perform throwing.ding`);
                        await session.sendAsync(`perform throwing.luo`);
                    } else {
                        await session.sendAsync(`perform sword.yi`);
                        await session.sendAsync(`perform throwing.jiang`);
                        await session.sendAsync(`perform unarmed.duo`);
                        await session.sendAsync(`perform unarmed.juan`);
                    }
                }
            }
            if (data.type === 'combat' && data.end === 1 && die != 1) {
                inCombat = 0;
                await wumiao(15000);
                await xiulian(1000);
                await Promise.promisify(appendFile)(fileName, new Date() + `combat end 任务end!!!!!!!!!!!!!!!!! \n`);
                cancelled = true;
                //self.priority=-1;
                //return;
            }
            if (data.type === 'sc' && data.hp != null && data.id == masterId && inCombat == 0) {
                await Promise.promisify(appendFile)(fileName, new Date() + `detect hp loose start combat!!!!!!!!!!!!!!!!! \n`);
                inCombat = 1;
                if (config.name == '咬人的豆包') {
                    await session.sendAsync(`kill ${masterId}`);
                    await session.sendAsync(`perform force.cui`);
                    await session.sendAsync(`perform blade.shi`);
                    await session.sendAsync(`perform blade.xue`);
                    await session.sendAsync(`perform unarmed.liu`);
                    await session.sendAsync(`perform unarmed.qi`);
                    await session.sendAsync(`perform throwing.ding`);
                    await session.sendAsync(`perform throwing.luo`);
                } else {
                    await session.sendAsync(`perform sword.yi`);
                    await session.sendAsync(`perform throwing.jiang`);
                    await session.sendAsync(`perform unarmed.duo`);
                    await session.sendAsync(`perform unarmed.juan`);
                }
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
            if(data.type==='dialog'&&data.dialog==='score'){
                if(data.name.includes('闭关')){
                    biguan=true;
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
            await Promise.delay(1000);
            await session.sendAsync("score");
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

        session.removeAllListeners('message');
        session.removeAllListeners('msg');
        session.removeAllListeners('data');
        //session.on('message', processMessage);
        //session.on('msg', processMsg);
        //session.on('data', processData);
        await Promise.promisify(appendFile)(fileName, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
        inCombat = 0;
        session.on('msg', processMsg);
        session.on('message', processMessage);
        await Promise.delay(10000);
        await session.sendAsync("stopstate");

        if (config.name == '咬人的豆包') {
            await session.sendAsync("eq eeb5367bd2c");
            await session.sendAsync("eq 94f6354632f");
            await session.sendAsync("eq sn1v32c6941");
            await session.sendAsync("eq 1ilj2bc7f74");
            await session.sendAsync("enable sword xuantiejianfa");
            await session.sendAsync("enable unarmed liumaishenjian");
            await session.sendAsync("enable parry hengshanwushenjian"); 
            await session.sendAsync("enable force jiuyinshengong");
            await session.sendAsync("enable dodge anyingfuxiang");
            await session.sendAsync("eq g7da30ea8c6");
            await session.sendAsync("eq t3oh35831ab");
            await session.sendAsync("eq swvl276c971");
            await session.sendAsync("eq 897f2f6a67b");
            await session.sendAsync("eq qtoj3a0620f");
            await session.sendAsync("eq 7umw35abb08");
            await session.sendAsync("eq gzac401f23d");
        } else if (config.name == '咬人的馒头') {
            //await session.sendAsync("enable force mingyugong");
            await session.sendAsync("enable dodge anyingfuxiang");
            await session.sendAsync("eq rm4h3247f48");
        } else if (config.name == '半俗') {
            await session.sendAsync("enable force mingyugong");
            await session.sendAsync("enable dodge anyingfuxiang");
            await session.sendAsync("eq une4321ec96");
        }
        await Promise.delay(5000);
        await session.sendAsync("xiulian");

        while (true) {
            if (this.isCancellationRequested || cancelled) {
                while(!biguan){
                    await xiulian(1000);
                    await Promise.delay(1000 * 10);
                }
                session.removeAllListeners('message');
                session.removeAllListeners('msg');
                session.removeAllListeners('data');
                break;
            }
            await Promise.delay(2000 * 60 * 1);
            await session.sendAsync("look");
        }
        this.priority = -1;
        return;


    }



}


