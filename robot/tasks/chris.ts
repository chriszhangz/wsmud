import { UserConfig } from '../interface';
import { Session } from '../../core';
import { Msg } from '../../core/data';
import { Promise } from "bluebird";
import { Task } from "../task";

//const r = /<hig>你获得了(\d+)点/;

export class ChrisTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    async start(session: Session, config: UserConfig) {

        let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        let lastbook = new Date();
        let lastHour = -1;
        let lastchat = new Date();
        let positions = '';
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        /**
         * 获取指南持续时间的中文描述
         */
        // function GetZNTimes() {
        //     var time = new Date().getTime() - lastbook.getTime();
        //     time = time / 1000;
        //     var mins = Math.floor(time / 60);
        //     var secs = Math.floor(time % 60);
        //     return `${mins}分${secs}秒`;
        // }
        function GetChinaTime() {
            var d=new Date(); //创建一个Date对象
            var localTime = d.getTime();
            var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
            var utc = localTime + localOffset; //utc即GMT时间
            var offset = 8; 
            var hawaii = utc + (3600000 * offset);
            var nd = new Date(hawaii);
            var hour = nd.getHours();
            //console.log("Hawaii time is " + nd.toLocaleString());
            if(hour===21&&(nd.getDay()===2||nd.getDay()===4||nd.getDay()===6)){
                var time = new Date().getTime() - lastbook.getTime();
                time = time / 1000;
                var mins = Math.floor(time / 60);
                var secs = Math.floor(time % 60);
                return `${ch} 上一个BOSS出现在${mins}分${secs}秒以前`;
            }
            if(nd.getHours()===lastHour){
                var time = new Date().getTime() - lastbook.getTime();
                time = time / 1000;
                var mins = Math.floor(time / 60);
                var secs = Math.floor(time % 60);
                return `${ch} ${hour}点BOSS已经出现在${mins}分${secs}秒以前`;
            }else{
                return `${ch} ${hour}点BOSS还未刷新，请耐心等待~`;
            }
            //return `${mins}分${secs}秒`;
        }   
        /**
         * 处理普通文本消息，这个函数只处理经验获得消息
         * @param msg 普通文本消息
         */
        async function processMessage(msg: string) {
            // var matches;
            // if ((matches = r.exec(msg)) != null) {
            //     var point = parseInt(matches[1]) - (new Date().getHours() > 12 ? 15 : 40);
            //     var extra = Math.floor(point / 10) * 10;
            //     if (extra > 10000)
            //         return; //跨服击杀
            //     if ((current != extra) || newbook) {
            //         newbook = false;
            //         if (current == extra) {
            //             await session.sendAsync(`${ch} +${current}  (已持续${GetZNTimes()})`);
            //         }
            //         else {
            //             lastbook = new Date();
            //             current = extra;
            //             if (current == 0) {
            //                 await session.sendAsync(`${ch} 挖矿指南结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！`);
            //             }
            //             else {
            //                 await session.sendAsync(`${ch} +${current}`);
            //             }
            //         }
            //     }
            // }
        };
        /**
         * 处理聊天消息
         * @param data 
         */
        async function processMsg(data: Msg) {
             if (data.ch === "rumor") {
                 if (data.content.indexOf('听说') >= 0&&data.content.indexOf('出现')>=0) {
                    //var myDate = new Date();
                    //var mytime=myDate.toLocaleTimeString(); 
                    //await Promise.promisify(appendFile)(`./core/rooms/test.json`, mytime+'出现BOSS，距上个boss'+GetZNTimes()+`\n`);
                    newbook = true;
                    lastbook = new Date();
                    positions = '';
                    var localTime = lastbook.getTime();
                    var localOffset = lastbook.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
                    var utc = localTime + localOffset; //utc即GMT时间
                    var offset = 8; 
                    var hawaii = utc + (3600000 * offset);
                    var nd = new Date(hawaii);
                    lastHour = nd.getHours();
                 }
                }else if(data.ch === 'tm'){
                    console.log(data.name+":"+data.content);
                    positions+=data.content;
               }else if (data.ch === ch) {
                //console.log(data.name+":"+data.content);
                if (new Date().getTime() - lastchat.getTime() > 1000 * 8 && data.name!="" && data.name!="江湖精灵") {
                    //console.log(data.name+"::"+data.content);
                    var content = data.content.trim().toLowerCase();
                    // if (content === "wkzn" || content == "k") {
                    //     await session.sendAsync(`${ch} 目前的挖矿指南是+${current}已持续${GetZNTimes()}`);
                    //     lastchat = new Date();
                    // }
                    if (content.indexOf('白如盈') >=0 &&( content.indexOf('口')>=0||content.indexOf('摸')>=0||content.indexOf('床')>=0||content.indexOf('到我')>=0)) {
                        return;
                    }
                    if (content.indexOf('白如盈') >=0 && content.indexOf('你好')>=0) {
                        var userName = data.name;
                        if(data.name==='燧人氏'){
                            await session.sendAsync(`${ch} 燧大侠~ 您好^^！`);
                        }else if(data.name==='半俗'){
                            await session.sendAsync(`${ch} 俗~ 今天玫瑰送了没^^？`);
                        }else if(data.name==='法王孙笑川'){
                            await session.sendAsync(`${ch} 新人导师法王孙笑川~ 您好^^！`);
                        }else if(data.name==='讓叁招'){
                            await session.sendAsync(`${ch} 阿三~ 你好^^！`);
                        }else if(data.name==='诸葛擎'){
                            await session.sendAsync(`${ch} 萌新导师诸葛擎~ 您好^^！`);
                        }else if(data.name==='关心'){
                            await session.sendAsync(`${ch} 关心小姐姐好^^！`);
                        }else if(data.name==='轩辕天宇'){
                            await session.sendAsync(`${ch} 天宇小姐姐好^^！`);
                        }else if(data.lv===5){
                            await session.sendAsync(`${ch} 哇武。。。武帝您好, ${userName}！`);
                        }else if(data.lv===4){
                            await session.sendAsync(`${ch} 您好武圣大佬, ${userName}！`);
                        }else if(data.lv===3){
                            await session.sendAsync(`${ch} 您好宗师前辈, ${userName}！`);
                        }else{
                            await session.sendAsync(`${ch} 您好, ${userName}！`);
                        }
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('什么')>=0&&( content.indexOf('用')>=0||content.indexOf('能')>=0)) {
                        var userName = data.name;
                        await session.sendAsync(`${ch} 您好${userName}，我已升级2.0版，能报boss时间以及具体位置（华山部分地图除外）。如有需要请联系我的主人谢谢。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('主人')>=0&& content.indexOf('谁')>=0) {
                        var userName = data.name;
                        await session.sendAsync(`${ch} 您好${userName}，我的主人是咬人的豆包。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('是谁')>=0) {
                        var userName = data.name;
                        await session.sendAsync(`${ch} 您好${userName}，我是豆包的机器人。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('在哪儿')>=0) {
                        var userName = data.name;
                        await session.sendAsync(`${ch} 您好${userName}，我在挖矿^^。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('爱你')>=0) {
                        var userName = data.name;
                        await session.sendAsync(`${ch} *咯咯`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0 &&( content.indexOf('傻')>=0||content.indexOf('笨')>=0||content.indexOf('贱')>=0||content.indexOf('蠢')>=0||content.indexOf('白痴')>=0||content.indexOf('弱智')>=0)) {
                        var userName = data.name;
                        await session.sendAsync(`${ch} *生气`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0) {
                        var userName = data.name;
                        if(data.lv===5){
                            await session.sendAsync(`${ch} 哇武。。。武帝${userName}您好, 有何吩咐？`);
                        }else if(data.lv===4){
                            await session.sendAsync(`${ch} 您好武圣大佬${userName}, 有何指示？`);
                        }else if(data.lv===3){
                            await session.sendAsync(`${ch} 您好宗师前辈${userName}, 需要我做什么？`);
                        }else{
                            await session.sendAsync(`${ch} 您叫我有事么, ${userName}?`);
                        }
                        //await session.sendAsync(`${ch} 您叫我有事么, ${userName}？`);
                        lastchat = new Date();
                    }else if (content === "boss" ||content === "b" ){
                        if(newbook){
                            if(new Date().getTime() - lastbook.getTime() >= 1000 * 60*10){
                                positions = '';
                               }
                            await session.sendAsync(`${GetChinaTime()}`+positions);
                        }else{
                            await session.sendAsync(`${ch} 抱歉，我刚升级完毕,将等待下一个BOSS出现后开始计时。`);
                        }
                        lastchat = new Date();
                    }
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





