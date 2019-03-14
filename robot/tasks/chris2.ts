import { UserConfig } from '../interface';
import { Session } from '../../core';
import { Msg,Data } from '../../core/data';
import { Promise } from "bluebird";
import { Task } from "../task";

//const r = /<hig>你获得了(\d+)点/;
const yaoyan = /听说(\D+)出现在(\D+)一带。/;//听说张无忌出现在峨嵋派-厨房一带。
const bangpaizhan = /成员听令，即刻起开始进攻/;
const jhstart = /襄阳战事正紧(\S+)</;
const endJob = /你先去休息一下吧/;
const quest = /为师最近突然想尝一下<wht>包子/;
const quest2 = /我要的是<wht>包子/;
const qnjs = /^(qnjs|q)\s(\d+)\s(\d+)\s(\D+)$/;
const sxjs = /^(sxjs|s)\s(\d+)\s(\D+)$/;
const lxjs = /^(lxjs|l)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\D+)$/;
const dzjs = /^(dzjs|d)\s(\d+)\s(\d+)\s(\d+)$/;
const look = /^(look|l)\s(\D+)$/;
const check = /^(check|c)\s(\D+)$/;
const message = /^(message|m)\s([\S\s]*)$/;
const help = /^(help|h)$/;
const helpDetail = /^(help|h)\s(\D+)$/;
let msgs = [""];
let idOfBaoZi = '';
let shimen = 0;
let taskPath = "jh fam 4 start;go west";
let masterName = "苏梦清";

export class ChrisTask2 extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    async start(session: Session, config: UserConfig) {

        let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        let numOfYaoyan = 0; //当前数值
        let newXYs = false;
        let newXYe = false;
        let lastBpz = new Date();
        let lastXYs = new Date();
        let lastXYe = new Date().getTime();
        let lastbook = new Date();
        let lastHour = -1;
        let lastchat = new Date();
        let positions = '';
        let partyWar = 0;
        let jhmsg;
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        //const ch = "pty";
        const pty = "pty";
        const mysql = require('mysql');
        const connection = mysql.createConnection({
          host: '54.241.201.225',
          user: 'chris',
          password: '1982525',
          database: 'wsmud'
        });        
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
                // if(hour===18||hour===19||hour===20||hour===21||hour===22){
                //     return `${ch} 🐾${hour}点BOSS已经出现在${mins}分${secs}秒以前，门派战期间我不敢去搜索BOSS，抱歉😭`;
                // } 
                return `${ch} 🐾${hour}点BOSS已经出现在${mins}分${secs}秒以前`;
            }else{
                if(new Date().getTime() - lastbook.getTime() >= 1000 * 60*10){
                    positions = '';                    
                    numOfYaoyan=0;
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
        async function processPartyWar() {
            await Promise.delay(5*60*1000-5000);
            if(partyWar==0)return;
            await session.sendAsync(`${pty} 5秒内下一波刷新`);
            await Promise.delay(5000);
            await Promise.delay(5*60*1000-5000);
            if(partyWar==0)return;
            await session.sendAsync(`${pty} 5秒内下一波刷新`);
            await Promise.delay(5000);
            await Promise.delay(5*60*1000-5000);
            if(partyWar==0)return;
            await session.sendAsync(`${pty} 5秒内下一波刷新`);
            await Promise.delay(5000);
            await Promise.delay(5*60*1000-5000);
            if(partyWar==0)return;
            await session.sendAsync(`${pty} 5秒内下一波刷新`);
            await Promise.delay(5000);
            await Promise.delay(5*60*1000-5000);
            if(partyWar==0)return;
            await session.sendAsync(`${pty} 5秒内最后一波刷新！！！！！！！！！`);
        }
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
                    var matches;
                    if ((matches = yaoyan.exec(data.content)) != null) {
                        var bossName = matches[1];
                        var bossPosition = matches[2];
                        let cont = ' ' + bossName + ':' + bossPosition;
                        positions+=cont;
                        numOfYaoyan++;
                    }
                    if(numOfYaoyan===3){
                        await session.sendAsync(`${GetChinaTime()}`+positions);
                        numOfYaoyan=0;
                    }
                 }else if(data.content.indexOf('听说') >= 0&&data.content.indexOf('近日将会进攻襄阳')>=0){
                    //console.log(`襄阳保卫战现在开启`);
                    newXYs = true;
                    newXYe = false;
                    lastXYs = new Date();
                    jhmsg='';
                 }else if(data.content.indexOf('听说') >= 0&&data.content.indexOf('有人得到了')>=0){
                    //console.log(`襄阳保卫战现在开启`);
                    await session.sendAsync(`${ch} *恭喜`);
                 }else if(data.content.indexOf('听说有人从武道塔跳下来摔死了')>=0 ){
                    //console.log(`襄阳保卫战现在开启`);
                    await session.sendAsync(`${ch} *鼓掌`);
                 }
                }else if(data.ch === 'sys'){
                 if(data.content.indexOf('襄阳城大获全胜') >= 0 || data.content.indexOf('襄阳城失守')>=0){
                    //console.log(`襄阳保卫战over`);
                    newXYs = false;
                    newXYe = true;
                    lastXYe = new Date().getTime()+3600000;
                 }
               }else if(data.ch === 'pty'){
                //console.log(data.name+":"+data.content);                

                if (data.content === "bpz" || data.content === "b" ){                    
                    var time = lastBpz.getTime()+3600000 - new Date().getTime();
                    //time = time / 1000;
                    //var mins = Math.floor(time / 60);
                    //var secs = Math.floor(time % 60);
                    //await session.sendAsync(`${ch} 😄襄阳保卫战开始于 ${mins}分${secs}秒以前`+jhmsg);
                    //console.log('time='+time);
                    if(time<3600000){
                        time = time / 1000;
                        var mins = Math.floor(time / 60);
                        var secs = Math.floor(time % 60);
                        await session.sendAsync(`${pty} 😄帮派战可在 ${mins}分${secs}秒以后重新开启`);
                    }else{
                        await session.sendAsync(`${pty} 😄帮派战现在可以开启`);
                    }
                }
                if((matches = bangpaizhan.exec(data.content)) != null){
                    await session.sendAsync(`${pty} 帮派战计时开始`);
                    partyWar=1;
                    lastBpz = new Date();
                    processPartyWar();
                 }
                if(data.content.includes("接下来的一小时所有弟子练习效率提高")){
                    await session.sendAsync(`${pty} 帮派战计时结束`);
                    partyWar=0;
                }
                if(data.content.indexOf('-')>0&&(data.uid==='v8qh28f7257')){//ucdv256631d新月;r7c61934494洛玖尧;v8qh28f7257江暮雨
                    positions+=data.content;
                    numOfYaoyan++;
                }else if(data.content.indexOf('-')>0&&(data.uid==='r7c61934494')){
                    positions+=data.content;
                    numOfYaoyan++;
                }
                if(numOfYaoyan===3){
                    await session.sendAsync(`${GetChinaTime()}`+positions);
                    numOfYaoyan=0;
                }
           }else if (data.ch === ch) {
                //console.log(data.name+":"+data.content);
                var matches;
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
                            await session.sendAsync(`${ch} 😄你莫得感情，你系金牌杀手夜臣~！`);
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
                        await session.sendAsync(`${ch} 您好${userName}，我已升级4.0版，具体使用方法请用help命令查询谢谢。😄`);
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
                    }else if ((matches = help.exec(data.content)) != null) {
                        await session.sendAsync(`${ch} 目前可用命令 b/boss c/check d/dzjs l/lxjs l/look m/message q/qnjs s/sxjs x/xy, help 加命令查询具体使用方法。`);
                    }
                    else if ((matches = message.exec(data.content)) != null) {
                        await session.sendAsync(`${ch} 留言已记录，谢谢这位大侠。`);
                    }
                    else if ((matches = helpDetail.exec(data.content)) != null) {
                        var rtmsg;
                        switch (matches[2]) {
                            case 'b':
                            case 'boss':
                                rtmsg = '💡b/boss：查询世界boss信息。';
                                break;
                            case 'c':
                            case 'check':
                                rtmsg = '💡c/check 角色名：查询该角色曾用名以及最后发言日期。由于记录数据时间较晚，有好心侠客想提供以前的曾用名请用m/message留言谢谢。';
                                break;
                            case 'd':
                            case 'dzjs':
                                rtmsg = '💡d/dzjs 每跳加内力 当前内力 目标内力：查询打坐所需时间。';
                                break;
                            case 'l':
                                rtmsg = '💡l/look 角色名：查询该角色当前状态。| l/lxjs 先天悟性 后天悟性 练习效率 当前等级 目标等级 技能颜色：查询练习所需潜能以及时间。';
                                break;
                            case 'look':
                                rtmsg = '💡l/look 角色名：查询该角色当前状态。';
                                break;
                            case 'lxjs':
                                rtmsg = '💡l/lxjs 先天悟性 后天悟性 练习效率 当前等级 目标等级 技能颜色：查询练习所需潜能以及时间。';
                                break;
                            case 'm':
                            case 'message':
                                rtmsg = '💡m/message 留言：如果有任何建议，意见欢迎留言，豆包会定时查看谢谢。';
                                break;
                            case 'q':
                            case 'qnjs':
                                rtmsg = '💡q/qnjs 当前等级 目标等级 技能颜色：查询练习所需潜能。';
                                break;
                            case 's':
                            case 'sxjs':
                                rtmsg = '💡s/sxjs 技能等级 境界：查询到达该境界技能等级上限所需经验。';
                                break;
                            case 'x':
                            case 'xy':
                                rtmsg = '💡x/xy：查询襄阳城相关信息。';
                                break;
                            default:
                                return;
                        }
                        await session.sendAsync(`${ch} ${rtmsg}`);
                    }
                    else if ((matches = dzjs.exec(data.content)) != null) {
                        var dazuo = timeText((parseInt(matches[4]) - parseInt(matches[3])) / parseInt(matches[2]) / 6);
                        await session.sendAsync(`${ch} ${data.name} 打坐完需要时间：${dazuo}`);
    
                    }
                    else if ((matches = qnjs.exec(data.content)) != null) {
                        var level;
                        switch (matches[4]) {
                            case '白':
                            case '白色':
                                level = 2.5;
                                break;
                            case '绿':
                            case '绿色':
                                level = 5;
                                break;
                            case '蓝':
                            case '蓝色':
                                level = 7.5;
                                break;
                            case '黄':
                            case '黄色':
                                level = 10;
                                break;
                            case '紫':
                            case '紫色':
                                level = 12.5;
                                break;
                            case '橙':
                            case '橙色':
                                level = 15;
                                break;
                            default:
                                return;
                        }
                        var qianneng = caculateQN(matches[2], matches[3], level);
                        await session.sendAsync(`pty ${data.name} 需要潜能：${qianneng}`);
    
                    }
                    else if ((matches = lxjs.exec(data.content)) != null) {
                        var level;
                        switch (matches[7]) {
                            case '白':
                            case '白色':
                                level = 2.5;
                                break;
                            case '绿':
                            case '绿色':
                                level = 5;
                                break;
                            case '蓝':
                            case '蓝色':
                                level = 7.5;
                                break;
                            case '黄':
                            case '黄色':
                                level = 10;
                                break;
                            case '紫':
                            case '紫色':
                                level = 12.5;
                                break;
                            case '橙':
                            case '橙色':
                                level = 15;
                                break;
                            default:
                                return;
                        }
                        var qianneng = caculateQN(matches[5], matches[6], level);
                        var lx = qianneng / (parseInt(matches[2]) + parseInt(matches[3])) / (100 / 100 + parseInt(matches[4]) / 100 - parseInt(matches[2]) / 100) / 12;
                        //console.log('lx:' + lx);
                        var text = timeText(lx);
                        await session.sendAsync(`${ch} ${data.name} 练习需要时间：${text}，需要潜能：${qianneng}`);
    
                    }
                    else if ((matches = sxjs.exec(data.content)) != null) {
                        var level;
                        switch (matches[3]) {
                            case '武士':
                                level = 20;
                                break;
                            case '武师':
                                level = 30;
                                break;
                            case '宗师':
                                level = 40;
                                break;
                            case '武圣':
                                level = 50;
                                break;
                            case '武帝':
                                level = 60;
                                break;
                            default:
                                return;
                        }
                        var jingyan = caculateJY(matches[2], level);
                        await session.sendAsync(`pty ${matches[3]}${matches[2]}级技能上限，需要经验：${jingyan}`);
                    }
                    else if ((matches = check.exec(data.content)) != null) {
                        if (matches[2] != '') {
                            connection.query(`select a.user_name,a.user_lastchat from ws_user a where a.user_name = ? or a.user_name like ? or a.user_name like ?`, [matches[2], matches[2] + ',%', '%,' + matches[2]], (err, rows) => {
                                if (err) throw err;
                                if (rows.length == 0) {
                                    //console.log('抱歉，暂无 ' + userName + ' 的数据记录');
                                    session.sendAsync(`${ch} 抱歉，暂无 ${matches[2]} 的数据记录`);
                                } else {
                                    let date = new Date();
                                    date = rows[0].user_lastchat;
                                    var foundMsg = '';
                                    for (const row in rows) {
                                        if (matches[2] != rows[row].user_name) {
                                            foundMsg += matches[2] + '(' + rows[row].user_name + ') 最后一次发言日期:' + date.toISOString().split("T")[0] + '。 ';
                                        } else {
                                            foundMsg += matches[2] + ' 最后一次发言日期:' + date.toISOString().split("T")[0] + ' ';
                                        }
                                    }
                                    //console.log(foundMsg);
                                    session.sendAsync(`${ch} ${foundMsg}`);
                                }
                            });
                        }
                    }
                    else if ((matches = look.exec(data.content)) != null) {
                        //var userName = matches[2];
                        if (matches[2] != '') {
                            connection.query(`select a.user_id from ws_user a where a.user_name = ? or a.user_name like ? or a.user_name like ?`, [matches[2], matches[2] + ',%', '%,' + matches[2]], (err, rows) => {
                                if (err) throw err;
                                if (rows.length == 0) {
                                    //console.log('抱歉，暂无 ' + matches[2] + ' 的数据记录');
                                    session.sendAsync(`${ch} 抱歉，暂无 ${matches[2]} 的数据记录`);
                                } else {
                                    session.sendAsync(`look3 ${rows[0].user_id}`);
                                }
                            });
    
                        }
                    }else if (content === "boss" ||content === "b" ){
                        if(newbook){
                            await session.sendAsync(`${GetChinaTime()}`+positions);
                        }else{
                            await session.sendAsync(`${ch} 😉抱歉，我刚升级完毕,将等待下一个BOSS出现后开始计时。`);
                        }
                        lastchat = new Date();
                    }else if (content === "xy" ||content === "x" ){
                        if(newXYs){
                            await session.sendAsync(`jh fam 8`);
                            // var time = new Date().getTime() - lastXYs.getTime();
                            // time = time / 1000;
                            // var mins = Math.floor(time / 60);
                            // var secs = Math.floor(time % 60);
                            // await session.sendAsync(`${ch} 😄襄阳保卫战开始于 ${mins}分${secs}秒以前`+jhmsg);
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
        async function processData(data: Data) {
            //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            if (data.type === 'dialog'&&data.dialog==='jh'&&data.index!=null&&data.index==8){
                if(data.desc.includes("襄阳战事正紧，")){
                    var matches;
                    if((matches = jhstart.exec(data.desc)) != null){
                        jhmsg = matches[1];
                        var time = new Date().getTime() - lastXYs.getTime();
                        time = time / 1000;
                        var mins = Math.floor(time / 60);
                        var secs = Math.floor(time % 60);
                        await session.sendAsync(`${ch} 😄襄阳保卫战开始于 ${mins}分${secs}秒以前`+jhmsg);
                        //console.log('jhmsg:'+jhmsg);
                    }
                }
            }
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
        }
        async function processMessage(msg: string) {
            //console.log(msg);
            if(msg.includes('看起来约')){
                var status:string;
                if(msg.includes('他看起来约')){
                    status=msg.split('他装备着')[0];
                }else{
                    status=msg.split('她装备着')[0];
                }
                status=status.replace(/<[A-Za-z]+>/g,'').replace(/<\/[A-Za-z]+>/g,'').replace('&lt;','<').replace('&gt;','>').replace(/(?:\r\n|\r|\n)/g, ' ');
                //console.log('status:'+status);
                await session.sendAsync(`pty ${status}`);
            }
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
        var CronJob = require('cron').CronJob;
        new CronJob('00 10 05 * * *', async function () {
            //console.log(new Date() + "任务start!!!!!!!!!!!!!!!!!")
            await callback();
        }, null, true, 'Asia/Shanghai');

        session.removeAllListeners('message');
        session.removeAllListeners('msg');
        session.removeAllListeners('data');
        session.on('message', processMessage);
        session.on('msg', processMsg);
        session.on('data', processData);

        async function callback() {
            //console.log("start..")
            await session.sendAsync("stopstate");
            let taskPaths: string[] = taskPath.split(";");
            for (let i = 0; i < taskPaths.length; i++) {
                //console.log('Execute:'+cmdss[i].content);
                await session.sendAsync(taskPaths[i]);
                await Promise.delay(500);
            }
            await Promise.delay(5050);
            await session.sendAsync("tasks");
            const master = session.world.items.find(i => i && i.name.endsWith(masterName))

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
        function caculateQN(csdj: number, mbdj: number, djys: number): number {

            var qianneng = (mbdj * mbdj - csdj * csdj) * djys;
            //console.log('qianneng:' + qianneng);
            return qianneng;
        }
        function caculateJY(mbdj: number, jingjie: number): number {

            var jingyan = (mbdj * mbdj * mbdj) / jingjie;
            //console.log('jingyan:' + jingyan);
            return parseInt(jingyan.toString());
        }
        function timeText(t: number): string {
            if (t < 60) {
                var text = "";
                text = text + parseInt(t.toString()) + "分钟";
                return text;
            } else {
                var text = "";
                var d;
                var h = parseInt((t / 60).toString());
                var m = parseInt((t % 60).toString());

                if (h > 24) {
                    d = parseInt((h / 24).toString());
                    h = h % 24;
                    text = text + d + "天";
                }
                text = text + h + "小时" + m + "分钟";
                return text;
            }
        }
        while (true) {
            if (this.isCancellationRequested) {
                session.removeAllListeners('message');
                session.removeAllListeners('msg');
                session.removeAllListeners('data');
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }
}





