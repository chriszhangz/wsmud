import { Task } from "../task";
import { Session } from "../../core";
import { Msg, Items, RoomItem } from '../../core/data';
import { UserConfig } from "../interface";
import { Promise } from "bluebird";


// const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。
// const endJob = /你先去休息一下吧/;
// const quest = /为师最近突然想尝一下<wht>包子/;
// const quest2 = /我要的是<wht>包子/;
const team = /<hig>已经发送对(\D+)的组队邀请。/;
const team2 = /(\D+)已加入组队，无法接受你的请求。/;
const team3 = /你已经邀请过(\D+)了，正在等待回应。/;
// let msgs = [""];
// let idOfBaoZi = '';
let needCheck = 0;
let checking = 0;

export class FindKillerTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }
    
    private cmds: cmd[] = [
    {content:"jh fam 0 start",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},
    {content:"go south",type:0},{content:"go south",type:0},{content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go up",type:1},{content:"go down",type:0},{content:"go west",type:0},
    {content:"go south",type:0},{content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go south",type:0},
    {content:"go west",type:1},{content:"go west",type:1},{content:"go west",type:1},{content:"go west",type:1},
    {content:"go east",type:0},{content:"go east",type:0},{content:"go south",type:1},{content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},
    {content:"go east",type:0},{content:"go north",type:1},{content:"go north",type:1},{content:"go south",type:0},{content:"go south",type:0},{content:"go south",type:1},{content:"go north",type:0},{content:"go east",type:0},
    {content:"go south",type:1},{content:"go south",type:1},{content:"go south",type:1},{content:"go west",type:1},{content:"go east",type:0},{content:"go north",type:0},
    {content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:0},
    {content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:0},
    {content:"go east",type:1},{content:"go east",type:1},{content:"go east",type:1},{content:"go south",type:1},{content:"go north",type:0},
    {content:"go west",type:0},{content:"go north",type:1},{content:"go north",type:1},{content:"go south",type:0},{content:"go south",type:0},{content:"go south",type:1},{content:"go north",type:0},{content:"go west",type:0},
    {content:"go north",type:1},{content:"go south",type:0},{content:"go south",type:1},{content:"go up",type:1},{content:"go down",type:0},{content:"go north",type:0},

    {content:"jh fam 1 start",type:1},{content:"go north",type:1},{content:"go south",type:0},
    {content:"go west",type:1},{content:"go west",type:1},{content:"go east",type:0},{content:"go northup",type:1},
    {content:"go north",type:1},{content:"go east",type:1},{content:"go west",type:0},{content:"go west",type:1},
    {content:"go northup",type:1},{content:"go northup",type:1},{content:"go northup",type:1},{content:"go north",type:1},
    {content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},
    {content:"jh fam 2 start",type:1},{content:"go north",type:1},{content:"go west",type:1},{content:"go east",type:0},
    {content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:1},{content:"go northup",type:1},{content:"go southdown",type:0},{content:"go northwest",type:1},
    {content:"go northeast",type:1},{content:"go southeast",type:1},{content:"go northwest",type:0},{content:"go north",type:1},
    {content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:1},
    {content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:1},
    {content:"go west",type:1},{content:"go east",type:0},{content:"go north",type:1},{content:"go north",type:1},
    {content:"jh fam 4 start",type:1},{content:"go northup",type:1},{content:"go east",type:1},{content:"go west",type:0},{content:"go southdown",type:0},
    {content:"go west",type:1},{content:"go south",type:1},{content:"go west",type:1},{content:"go north",type:1},{content:"go north",type:1},
    {content:"go south",type:0},{content:"go south",type:0},{content:"go west",type:1},{content:"go east",type:0},{content:"go south",type:1},
    {content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},{content:"go east",type:0},{content:"go east",type:1},
    {content:"go south",type:1},{content:"go north",type:0},{content:"go east",type:1},
    {content:"jh fam 5 start",type:2},{content:"go north",type:1},{content:"go north",type:1},{content:"go south",type:0},{content:"go south",type:0},
    {content:"go west",type:1},{content:"go south",type:1},{content:"go north",type:0},{content:"go east",type:0},{content:"go south",type:1},
    {content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},{content:"go east",type:1},{content:"go north",type:1},
    {content:"go south",type:0},{content:"go south",type:1},{content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},
    {content:"go west",type:0},{content:"go down",type:1},{content:"go down",type:1},
    {content:"jh fam 6 start",type:2},{content:"go down",type:1},{content:"go east",type:1},{content:"go east",type:1},{content:"go east",type:1},
    {content:"go up",type:1},{content:"go down",type:0},{content:"go east",type:1},{content:"go east",type:1},{content:"go up",type:1},
    {content:"jh fam 3 start",type:2},{content:"go westup",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},
    {content:"go south",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go south",type:0},{content:"go east",type:1},
    {content:"go west",type:0},{content:"go south",type:0},{content:"go west",type:1},{content:"go east",type:0},{content:"go south",type:1},
    {content:"go southup",type:1},{content:"go southup",type:1},{content:"break bi",type:2},{content:"go enter",type:1},//break bi
    {content:"go westup",type:1},{content:"go westup",type:1},{content:"jh fam 3 start",type:2},{content:"go eastup",type:1},
    {content:"go southup",type:1},{content:"jumpdown",type:1},{content:"go southup",type:1},{content:"go south",type:1},{content:"go east",type:1}, // jumpdown
    {content:"jh fam 0 start",type:2},{content:"go west",type:0},{content:"go west",type:0},{content:"go north",type:0},{content:"go enter",type:0},{content:"wa",type:0}
];
    async start(session: Session, config: UserConfig) {
        let cmdss = this.cmds;
        //let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        //let lastbook = new Date();
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        //const ch = "chat";
        //const tm = "tm";
        const pty = "pty";
        // const rumor = "rumor";

        // var self = this;
        var checkName = "";
        var checkId = "";
        var results = new Array();
        //let taskPath = self.taskPath;
        //let masterName = self.masterName;
        //this.priority = -1;
        async function processItemMessage(items: Items) {
            console.log(items);
            if(needCheck==1){
                //console.log("Need Check...");
                var room = session.world.room;
                console.log("searching.."+room.name);
            for(const item in items.items){
                //console.log(items.items[item]);
                if(items.items[item].p==1&&items.items[item].name&&!items.items[item].name.includes("断线中")&&items.items[item].id!='v8qh28f7257'){
                    //console.log(items.items[item].id+":"+items.items[item].name);
                    await Promise.delay(500);
                    var pid = items.items[item].id;
                    checkName = items.items[item].name;
                    checkId = pid;
                    await session.sendAsync(`team add ${pid}`);
                    checking=1;
                    let w = 0;
                    while(checking==1&&w<10){
                        w++;
                        await Promise.delay(1000);
                    }
                }
            }            
            }
            needCheck=0;
            await session.sendAsync(`team out v8qh28f7257`);
            console.log("finish!");
        };

        async function processMessage(msg: string) {
            console.log(msg);
            var matches;
            var room = session.world.room;
            console.log("searching.."+room.name);
            if ((matches = team.exec(msg)) != null||(matches = team2.exec(msg)) != null||(matches = team3.exec(msg)) != null) {
                var playerName = matches[1];
                if(!checkName.includes(playerName)){
                    let result=checkName+"很可疑！组队名字："+playerName+":"+checkId+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
                    console.log(result);   
                    results.push(result)
                    // var s=         checkName+"很可疑！组队名字："+playerName;          
                    await session.sendAsync(`${pty} ${result}`);
                }else{
                    console.log(checkName+"通过检测"); 
                    // var s=         checkName+"通过检测";          
                    // await session.sendAsync(`${pty} ${s}`);
                }
                checking=0;
                //console.log(new Date() + "师门完成..")
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                return;
            }
        };
        async function processItem(msg: RoomItem) {
            // console.log(msg);
            // var name = msg.desc;
            // if(name.includes("<")){
            //     if(name.indexOf("<")==0){
            //         name = name.split("</")[0];
            //     }
            //     else{
            //         name = name.split("<")[0];
            //     }
            // }
            // if(checkName.includes("<")){
            //     if(checkName.indexOf("<")==0){
            //         checkName = checkName.split("</")[0];
            //     }
            //     else{
            //         checkName = checkName.split("<")[0];
            //     }
            // }
            // if (name!=checkName) {
            //         let result=checkName+"很可疑！组队名字："+name+":"+checkId+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
            //         await session.sendAsync(`${pty} ${result}`);
            //         console.log(result);   
            //         results.push(result)
            //         // var s=         checkName+"很可疑！组队名字："+playerName;          
            //         // await session.sendAsync(`${pty} ${s}`);
            //     }else{
            //         console.log(checkName+"通过检测"); 
            //         // var s=         checkName+"通过检测";          
            //         // await session.sendAsync(`${pty} ${s}`);
            //     }
            //     checking=0;
            //     //console.log(new Date() + "师门完成..")
            //     //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
        }
        async function processMsg(data: Msg) {
            //console.log("^^^^^:"+data.content);
            // if (data.ch === rumor) {
            //     //console.log("****:"+data.content);//听说张无忌出现在峨嵋派-厨房一带。
            //     if (data.content.indexOf('听说') >= 0 && data.content.indexOf('出现') >= 0 && data.content.indexOf('踢下了擂台') < 0) {
            //         var matches;
            //         if ((matches = yaoyan.exec(data.content)) != null) {
            //             var bossName = matches[1];
            //             var bossPosition = matches[2];
            //             let cont = ' ' + bossName + ':' + bossPosition;
            //             await Promise.delay(1050);
            //             await session.sendAsync(`${pty} ${cont}`);
            //         }
            //     }
            // }
            // else if (data.ch === ch) {
            // }
        }

        session.removeListener('message', processMessage);
        session.removeListener('msg', processMsg);
        session.removeListener('items', processItemMessage);
        session.removeListener('item', processItem);
        session.on('message', processMessage);
        session.on('msg', processMsg);
        session.on('items', processItemMessage);
        session.on('item', processItem);
        await callback();

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                session.removeListener('items', processItemMessage);
                session.removeListener('item', processItem);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }

        async function callback() {
            await session.sendAsync("stopstate");
            for (let i = 0; i < cmdss.length; i++) {
                console.log('Execute:'+cmdss[i].content);
                await session.sendAsync(cmdss[i].content);
                if(cmdss[i].type==1){
                    needCheck=1;
                }
                await Promise.delay(1000);                
                let w = 0;
                while(needCheck==1&&w<60){
                    w++;
                    await Promise.delay(1000);
                }
            }
            if(results.length==0){
                console.log("No killer was found...");
                await session.sendAsync(`${pty} No killer was found...`);
            }
            for (var x in results)
            {
                console.log(results[x]);
            }
            await Promise.delay(10000);
            results=[];
            await callback();
        }
        // var CronJob = require('cron').CronJob;
        // new CronJob('00 20 13 * * *', async function () {
        //     await callback(self);
        // }, null, true, 'America/Los_Angeles');

    }



}

interface cmd {
    content: string;
    type: number;
}
