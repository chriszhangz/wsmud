import { Task } from "../task";
import { Session } from "../../core";
import { Msg } from '../../core/data';
import { UserConfig } from "../interface";
import {Promise} from "bluebird";

export class MineTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    private cmds: cmd[] = [{content:"stopstate",type:0},
    // {content:"jh fam 1 start",type:1},{content:"go north",type:1},{content:"go south",type:0},
    // {content:"go west",type:1},{content:"go west",type:1},{content:"go east",type:0},{content:"go northup",type:1},
    // {content:"go north",type:1},{content:"go east",type:1},{content:"go west",type:0},{content:"go west",type:1},
    // {content:"go northup",type:1},{content:"go northup",type:1},{content:"go northup",type:1},{content:"go north",type:1},
    // {content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},
    // {content:"jh fam 2 start",type:1},{content:"go north",type:1},{content:"go west",type:1},{content:"go east",type:0},
    // {content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:1},{content:"go northup",type:1},{content:"go southdown",type:0},{content:"go northwest",type:1},
    // {content:"go northeast",type:1},{content:"go southeast",type:1},{content:"go northwest",type:0},{content:"go north",type:1},
    // {content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:1},
    // {content:"go west",type:1},{content:"go east",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go north",type:1},
    // {content:"go west",type:1},{content:"go east",type:0},{content:"go north",type:1},{content:"go north",type:1},
    // {content:"jh fam 4 start",type:1},{content:"go northup",type:1},{content:"go east",type:1},{content:"go west",type:0},{content:"go southdown",type:0},
    // {content:"go west",type:1},{content:"go south",type:1},{content:"go west",type:1},{content:"go north",type:1},{content:"go north",type:1},
    // {content:"go south",type:0},{content:"go south",type:0},{content:"go west",type:1},{content:"go east",type:0},{content:"go south",type:1},
    // {content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},{content:"go east",type:0},{content:"go east",type:1},
    // {content:"go south",type:1},{content:"go north",type:0},{content:"go east",type:1},
    {content:"jh fam 5 start",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go south",type:0},{content:"go south",type:0},
    {content:"go west",type:1},{content:"go south",type:1},{content:"go north",type:0},{content:"go east",type:0},{content:"go south",type:1},
    {content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},{content:"go east",type:1},{content:"go north",type:1},
    {content:"go south",type:0},{content:"go south",type:1},{content:"go south",type:1},{content:"go north",type:0},{content:"go north",type:0},
    {content:"go west",type:0},{content:"go down",type:1},{content:"go down",type:1},
    {content:"jh fam 6 start",type:1},{content:"go down",type:1},{content:"go east",type:1},{content:"go east",type:1},{content:"go east",type:1},
    {content:"go up",type:1},{content:"go down",type:0},{content:"go east",type:1},{content:"go east",type:1},{content:"go up",type:1},
    {content:"jh fam 3 start",type:1},{content:"go westup",type:1},{content:"go north",type:1},{content:"go north",type:1},{content:"go north",type:1},
    {content:"go south",type:0},{content:"go east",type:1},{content:"go west",type:0},{content:"go south",type:0},{content:"go east",type:1},
    {content:"go west",type:0},{content:"go south",type:0},{content:"go west",type:1},{content:"go east",type:0},{content:"go south",type:1},
    {content:"go southup",type:1},{content:"go southup",type:1},//break bi
    {content:"go northdown",type:0},{content:"go northdown",type:0},{content:"go north",type:0},{content:"go eastdown",type:1},{content:"go eastup",type:1},
    {content:"go southup",type:1}, // jumpdown
    {content:"jh fam 0 start",type:0},{content:"go west",type:0},{content:"go west",type:0},{content:"go west",type:0},{content:"go west",type:0},{content:"wa",type:0}
];
    async start(session: Session, config: UserConfig) {
        let cmdss = this.cmds;
        let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        let lastbook = new Date();
        let lastchat = new Date();
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        const tm = "tm";
        const rumor = "rumor";
        function GetZNTimes() {
            var time = new Date().getTime() - lastbook.getTime();
            time = time / 1000;
            var mins = Math.floor(time / 60);
            var secs = Math.floor(time % 60);
            return `${mins}分${secs}秒`;
        }
        //this.priority = -1;
        async function processBoss( cmdss:cmd[] ) {
            let lastid ='0';
            for (let i = 0; i < cmdss.length; i++) {
                //console.log('Execute:'+cmdss[i].content);
                await session.sendAsync(cmdss[i].content);
                if(cmdss[i].type===0){
                    await Promise.delay(300);
                    continue;
                }
                await Promise.delay(600);
                //await Promise.delay(100);
                let items = session.world.items;
                while(lastid===items[0].id&&items[0].id!='94wc287e07b'){     
                    //console.log('wait'+items[0].id);
                    //if(items.length===1)lastid='0';               
                await Promise.delay(100);
                items = session.world.items;
                }
                const roomData = session.world.room;
                const roomName = roomData.name;
                //console.log(roomData.name);
                lastid = items[0].id;
                for(const item in items){
                    if(items[item].p!=1&&items[item].name)
                    {
                    console.log(roomName+':'+items[item].name);
                    let cont = searchBoss(items[item].name,roomName);
                    if(cont && cont!=''){
                        await session.sendAsync(`${tm} ${cont}`);
                    }
                    }
                }
            }
            for (const key in dic) {
                if (dic[key]!="") {
                    console.log('found boss '+key+' at '+dic[key]);
                }
            }
        }
        async function processMessage(msg: string) {

        };
        async function processMsg(data: Msg) {
            //console.log("^^^^^:"+data.content);
            if (data.ch === rumor) {
               //console.log("****:"+data.content);
                if (data.content.indexOf('听说') >= 0&&data.content.indexOf('出现')>=0) {
                   //var myDate = new Date();
                   //var mytime=myDate.toLocaleTimeString(); 
                   newbook = true;
                   lastbook = new Date();
                   clearBoss();
                   processBoss(cmdss);
                }
               }
               else if (data.ch === ch) {
               //console.log(data.name+":"+data.content);
               if (new Date().getTime() - lastchat.getTime() > 1000 * 8 && data.name!="" && data.name!="江湖精灵") {
                //    if(data.name==="咬人的馒头"){
                //     console.log(data.name+":"+data.content);
                //     newbook = true;
                //     lastbook = new Date();
                //     clearBoss();
                //     processBoss(cmdss);
                //    }
                   //console.log(data.name+"::"+data.content);
                //    var content = data.content.trim().toLowerCase();
                //    // if (content === "wkzn" || content == "k") {
                //    //     await session.sendAsync(`${ch} 目前的挖矿指南是+${current}已持续${GetZNTimes()}`);
                //    //     lastchat = new Date();
                //    // }
                //    if (content === "boss" ||content === "b" ){
                //        if(newbook){
                //            let positons = '';
                //            if(new Date().getTime() - lastbook.getTime() >= 1000 *60*10){
                //             for (const key in dic) {
                //                 if (dic[key]!="") {
                //                     positons+=' '+key+'在'+dic[key];
                //                 }
                //             }
                //            }
                //             console.log(`${ch} 上一个BOSS出现在${GetZNTimes()}以前。`+positons);
                //        }else{
                //             console.log(`${ch} 抱歉，我刚升级完毕,将等待下一个BOSS出现后开始计时。`);
                //        }
                //        lastchat = new Date();
                //    }
               }
           }
       }

       session.on('message', processMessage);
        session.on('msg', processMsg);

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }

    }


    
}

function searchBoss(name:string,position:string):string {
    for (const key in dic) {
        if (name.indexOf(key)>=0&&dic[key]=="") {
            dic[key]=position;
            let cont = ' '+key+':'+dic[key];
            return cont;
        }
    }
    return '';
}

function clearBoss() {
    for (const key in dic) {
        dic[key]='';
    }
}
interface cmd {
    content: string;
    type: number;
}

const dic: { [key: string]: string; } = {
    胡斐: "",
    夏雪宜: "",
    洪安通: "",
    左冷禅: "",
    何红药: "",
    何铁手: "",
    丁春秋: "",
    玉玑子: "",
    田伯光: "",
    曲洋: "",
    火龙王: "",
    谢逊: "",
    东方不败: "",
    黄药师: "",
    欧阳锋: "",
    邀月: "",
    涟星: "",
    慕容博: "",
    枯荣: "",
    //张无忌: "",
    //天山童姥: ""
};