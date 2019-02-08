import { UserConfig } from '../interface';
import { Session } from '../../core';
import { Msg } from '../../core/data';
import { Promise } from "bluebird";
import { Task } from "../task";

//const r = /<hig>你获得了(\d+)点/;
const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。

export class ChrisTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    async start(session: Session, config: UserConfig) {

        let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        let newXYs = false;
        let newXYe = false;
        let lastXYs = new Date();
        let lastXYe = new Date().getTime();
        let lastbook = new Date();
        let lastHour = -1;
        let lastchat = new Date();
        let positions = '';
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        //const ch = "pty";
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
                return `${ch} 🐾上一个BOSS出现在${mins}分${secs}秒以前`;
            }          
            if(nd.getHours()===lastHour){
                var time = new Date().getTime() - lastbook.getTime();
                time = time / 1000;
                var mins = Math.floor(time / 60);
                var secs = Math.floor(time % 60);
                if(hour===18||hour===19||hour===20||hour===21||hour===22){
                    return `${ch} 🐾${hour}点BOSS已经出现在${mins}分${secs}秒以前，门派战期间我不敢去搜索BOSS，抱歉😭`;
                } 
                return `${ch} 🐾${hour}点BOSS已经出现在${mins}分${secs}秒以前`;
            }else{
                if(new Date().getTime() - lastbook.getTime() >= 1000 * 60*10){
                    positions = '';
                   }
                return `${ch} 😟${hour}点BOSS还未刷新，请耐心等待~`;
            }
            //return `${mins}分${secs}秒`;
        }   
        /**
         * 处理普通文本消息，这个函数只处理经验获得消息
         * @param msg 普通文本消息
         */
        // async function processMessage(msg: string) {
        //     // var matches;
        //     // if ((matches = r.exec(msg)) != null) {
        //     //     var point = parseInt(matches[1]) - (new Date().getHours() > 12 ? 15 : 40);
        //     //     var extra = Math.floor(point / 10) * 10;
        //     //     if (extra > 10000)
        //     //         return; //跨服击杀
        //     //     if ((current != extra) || newbook) {
        //     //         newbook = false;
        //     //         if (current == extra) {
        //     //             await session.sendAsync(`${ch} +${current}  (已持续${GetZNTimes()})`);
        //     //         }
        //     //         else {
        //     //             lastbook = new Date();
        //     //             current = extra;
        //     //             if (current == 0) {
        //     //                 await session.sendAsync(`${ch} 挖矿指南结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！`);
        //     //             }
        //     //             else {
        //     //                 await session.sendAsync(`${ch} +${current}`);
        //     //             }
        //     //         }
        //     //     }
        //     // }
        // };
        /**
         * 处理聊天消息
         * @param data 
         */
        async function processMsg(data: Msg) {
             if (data.ch === "rumor") {
                 if (data.content.indexOf('听说') >= 0&&data.content.indexOf('出现')>=0&&data.content.indexOf('踢下了擂台')<0) {
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
                    // var matches;
                    // if ((matches = yaoyan.exec(data.content)) != null) {
                    //     var bossName = matches[1];
                    //     var bossPosition = matches[2];
                    //     let cont = ' ' + bossName + ':' + bossPosition;
                    //     positions+=cont;
                    // }
                 }else if(data.content.indexOf('听说') >= 0&&data.content.indexOf('近日将会进攻襄阳')>=0){
                    //console.log(`襄阳保卫战现在开启`);
                    newXYs = true;
                    newXYe = false;
                    lastXYs = new Date();
                 }else if(data.content.indexOf('听说') >= 0&&data.content.indexOf('有人得到了')>=0){
                    //console.log(`襄阳保卫战现在开启`);
                    await session.sendAsync(`${ch} *恭喜`);
                 }
                }else if(data.ch === 'sys'){
                 if(data.content.indexOf('襄阳城大获全胜') >= 0 || data.content.indexOf('襄阳城失守')>=0){
                    //console.log(`襄阳保卫战over`);
                    newXYs = false;
                    newXYe = true;
                    lastXYe = new Date().getTime()+3600000;
                 }
               }else if(data.ch === 'tm'){
                    //console.log(data.name+":"+data.content);
                    positions+=data.content;
            //    }else if(data.ch === 'pty'){
            //     //console.log(data.name+":"+data.content);
            //     if(data.content.indexOf('出现')>0&&(data.uid==='ucdv256631d')||data.uid==='v8qh28f7257'){//ucdv256631d新月;r7c61934494洛玖尧;v8qh28f7257江暮雨
            //         positions+=data.content;
            //     }
                }else if (data.ch === ch) {
                //console.log(data.name+":"+data.content);
                if (new Date().getTime() - lastchat.getTime() > 1000 * 8 && data.name!="" && data.name!="江湖精灵") {
                    //console.log(data.name+"::"+data.content);
                    var content = data.content.trim().toLowerCase();
                    var userName = data.name;
                    // if (content === "wkzn" || content == "k") {
                    //     await session.sendAsync(`${ch} 目前的挖矿指南是+${current}已持续${GetZNTimes()}`);
                    //     lastchat = new Date();
                    // }
                    if(data.name==='金古易'&& content.indexOf('恭')>=0){
                        await session.sendAsync(`${ch} *恭喜`);
                        lastchat = new Date();
                    }
                    if (content.indexOf('白如盈') >=0 &&( content.indexOf('口')>=0||content.indexOf('摸')>=0||content.indexOf('床')>=0||content.indexOf('到我')>=0)) {
                        return;
                    }
                    if (content=='白如盈'||(content.indexOf('白如盈') >=0 && content.indexOf('你好')>=0)) {
                        if(data.name==='燧人氏'){
                            await session.sendAsync(`${ch} 😍恭迎燧帝 ^^！`);
                        }else if(data.name==='半俗'||data.name==='江暮雨'){
                            await session.sendAsync(`${ch} 😊辣鸡俗~ 紫药王分解了没^^？`);
                        }else if(data.name==='法王孙笑川'){
                            await session.sendAsync(`${ch} ‍🧙‍♂️新人导师法王孙笑川~ 您好^^！`);
                        }else if(data.name==='森鹿予夏'||data.name==='冷鸢'){
                            await session.sendAsync(`${ch} ‍😄Cold Bird~ 小女子这厢有礼了^^！`);
                        }else if(data.name==='诸葛擎'){
                            await session.sendAsync(`${ch} ‍‍‍‍你好~诸葛家最*的^^！`);
                        }else if(data.name==='东方友利'){
                            await session.sendAsync(`${ch} ‍‍‍‍‍🤭东方前辈，盈盈要领教下阁下的白云踏歌^^！`);
                        }else if(data.name==='华斋贤'){
                            await session.sendAsync(`${ch} ↑这只华斋贤看起来好像中暑了，不如我们把他…`);
                        }else if(data.name==='轩辕天宇'){
                            await session.sendAsync(`${ch} 😄天宇小姐姐好^^！`);
                        }else if(data.name==='缨别扭'){
                            await session.sendAsync(`${ch} 😄百夫皮皮,你今天好像又变帅了一点^^！`);
                        }else if(data.name==='飞沙石'){
                            await session.sendAsync(`${ch} 😄女...大佬莎莎姐好！`);
                        }else if(data.name==='南宫栞'){
                            await session.sendAsync(`${ch} 😄二区第一喷 武帝南宫栞你好！`);
                        }else if(data.name==='严修'){
                            await session.sendAsync(`${ch} 😄天下倒数第一严修姐姐好！`);
                        }else if(data.name==='锦里'){
                            await session.sendAsync(`${ch} 😄最弱宗师小锦里好！`);
                        }else if(data.name==='濔不够资格'){
                            await session.sendAsync(`${ch} 😄月夜之狼~资格姐姐好！`);
                        }else if(data.name==='金战弓'){
                            await session.sendAsync(`${ch} 😄呃..我没有网站给你哦..我也看不清你的宝贝..2区最污~金战弓`);
                        }else if(data.name==='独步迪克'){
                            await session.sendAsync(`${ch} 😄嘤嘤怪独步小姐姐好~~嘤嘤嘤~`);
                        }else if(data.name==='西门木清'){
                            await session.sendAsync(`${ch} 😄西门少侠~你好！`);
                        }else if(data.name==='洛心依雨'){
                            await session.sendAsync(`${ch} 😄洛心小姐姐好~~！`);
                        }else if(data.name==='深井镔'){
                            await session.sendAsync(`${ch} 😄神经病。。。你好！`);
                        }else if(data.name==='骨傲天无敌'){
                            await session.sendAsync(`${ch} 😄恭迎过本过塔狂魔~骨帝~~~`);
                        }else if(data.name==='独孤一求败'){
                            await session.sendAsync(`${ch} 😄华山第一骚东方小娘子你好！`);
                        }else if(data.name==='酩酊酌雪'){
                            await session.sendAsync(`${ch} 😄奶雪帝姐姐~你好！`);
                        }else if(data.name==='讓叁拳'){
                            await session.sendAsync(`${ch} 😄印度神油总代理-阿三好！`);
                        }else if(data.name==='深井冰'){
                            await session.sendAsync(`${ch} 😄神经病~你好！`);
                        }else if(data.name==='无名剑客'){
                            await session.sendAsync(`${ch} 😄中二剑姬~老韩你好！`);
                        }else if(data.name==='夜臣'){
                            await session.sendAsync(`${ch} 😄萌新杀手夜臣~你好！`);
                        }else if(data.name==='放鹤'){
                            await session.sendAsync(`${ch} 😄作死小能手放鹤~你好~~`);
                        }else if(data.name==='卧灬龙'){
                            await session.sendAsync(`${ch} 😄柚子的小媳妇儿好~`);
                        }else if(data.name==='李静虚'){
                            await session.sendAsync(`${ch} 😄老静虚好~身子骨还好么？`);
                        }else if(data.name==='林仙儿'){
                            await session.sendAsync(`${ch} 😄仙儿小姐姐好~~`);
                        }else if(data.name==='天上地'){
                            await session.sendAsync(`${ch} 😄不过百塔不武帝,丐帮少侠天上地~你好！`);
                        }else if(data.name==='赎罪'){
                            await session.sendAsync(`${ch} 😄扬州赌神赎罪小姐姐~你好！`);
                        }else if(data.name==='白时默'){
                            await session.sendAsync(`${ch} 😄保底黑石墨~莎莎和诸葛的人头呢？`);
                        }else if(data.name==='紫云轩光'){
                            await session.sendAsync(`${ch} 😄赎罪小姐姐的老公~你好！`);
                        }else if(data.name==='故里'){
                            await session.sendAsync(`${ch} 😄二区最菜萌新~武帝故里~你好！`);
                        }else if(data.lv===5){
                            await session.sendAsync(`${ch} 哇武。。。武帝您好😻, ${userName}！`); 
                        }else if(data.lv===4){
                            await session.sendAsync(`${ch} 您好武圣大佬😊, ${userName}！`);
                        }else if(data.lv===3){
                            await session.sendAsync(`${ch} 您好宗师前辈😄, ${userName}！`);
                        }else{
                            await session.sendAsync(`${ch} 您好, ${userName}！`);
                        }
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('什么')>=0&&( content.indexOf('会')>=0||content.indexOf('用')>=0||content.indexOf('能')>=0||content.indexOf('升级')>=0)) {
                        await session.sendAsync(`${ch} 您好${userName}，我已升级3.0版，能报boss时间以及具体方位以及襄阳相关时间。😄`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('主人')>=0&& content.indexOf('谁')>=0) {
                        await session.sendAsync(`${ch} 😊您好${userName}，我的主人是咬人的豆包。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('是谁')>=0) {
                        await session.sendAsync(`${ch} 😊您好${userName}，我是豆包的机器人。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('在哪儿')>=0) { 
                        await session.sendAsync(`${ch} 😄您好${userName}，我在挖矿^^。`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0&& content.indexOf('不') <0 && (content.indexOf('爱你')>=0||content.indexOf('美')>=0||content.indexOf('漂亮')>=0||content.indexOf('好看')>=0||content.indexOf('可爱')>=0)) {
                        await session.sendAsync(`${ch} *脸红`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0 &&( content.indexOf('傻')>=0||content.indexOf('笨')>=0||content.indexOf('贱')>=0||content.indexOf('蠢')>=0||content.indexOf('白痴')>=0||content.indexOf('弱智')>=0)) {
                        await session.sendAsync(`${ch} *生气`);
                        lastchat = new Date();
                    }else if (content.indexOf('白如盈') >=0) {
                        if(data.lv===5){
                            await session.sendAsync(`${ch} 😻哇武。。。武帝${userName}您好, 有何吩咐？`);
                        }else if(data.lv===4){
                            await session.sendAsync(`${ch} 😊您好武圣大佬${userName}, 有何指示？`);
                        }else if(data.lv===3){
                            await session.sendAsync(`${ch} 😄您好宗师前辈${userName}, 需要我做什么？`);
                        }else{
                            await session.sendAsync(`${ch} 您叫我有事么, ${userName}?`);
                        }
                        //await session.sendAsync(`${ch} 您叫我有事么, ${userName}？`);
                        lastchat = new Date();
                    }else if (content === "boss" ||content === "b" ){
                        if(newbook){
                            await session.sendAsync(`${GetChinaTime()}`+positions);
                        }else{
                            await session.sendAsync(`${ch} 😉抱歉，我刚升级完毕,将等待下一个BOSS出现后开始计时。`);
                        }
                        lastchat = new Date();
                    }else if (content === "xy" ||content === "x" ){
                        if(newXYs){
                            var time = new Date().getTime() - lastXYs.getTime();
                            time = time / 1000;
                            var mins = Math.floor(time / 60);
                            var secs = Math.floor(time % 60);
                            await session.sendAsync(`${ch} 😄襄阳保卫战开始于 ${mins}分${secs}秒以前`);
                            //console.log(`😄襄阳保卫战开始于 ${mins}分${secs}秒以前`);
                        }else if(newXYe){
                            var time = lastXYe - new Date().getTime();
                            if(time>=0){
                                time = time / 1000;
                                var mins = Math.floor(time / 60);
                                var secs = Math.floor(time % 60);
                                await session.sendAsync(`${ch} 😄襄阳保卫战可在 ${mins}分${secs}秒以后重新开启`);
                                //console.log(`😄襄阳保卫战可在 ${mins}分${secs}秒以后重新开启`);
                            }else{
                                await session.sendAsync(`${ch} 😄襄阳保卫战现在可以开启`);
                                //console.log(`😄襄阳保卫战现在可以开启`);
                            }
                        }
                        lastchat = new Date();
                    }
                }
            }
        }


        //session.removeListener('message', processMessage);
        session.removeListener('msg', processMsg);
        //session.on('message', processMessage);
        session.on('msg', processMsg);

        while (true) {
            if (this.isCancellationRequested) {
                //session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }
}





