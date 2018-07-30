import { Task } from "../task";
import { Session } from "../../core";
import { Msg } from '../../core/data';
import { UserConfig } from "../interface";
import {Promise} from "bluebird";

export class AnswerTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    async  start(session: Session, config: UserConfig) {
        let newbook = false; //是否有新的book
        //let current = 0; //当前数值
        let lastbook = new Date();
        let lastHour = -1;
        let lastchat = new Date();
        let positions = '';
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        const rumor = "rumor";
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
        async function processMsg(data: Msg) {
            //console.log("^^^^^:"+data.content);
            if (data.ch === rumor) {
               //console.log("****:"+data.content);
                if (data.content.indexOf('听说') >= 0&&data.content.indexOf('出现')>=0) {
                   //var myDate = new Date();
                   //var mytime=myDate.toLocaleTimeString(); 
                   newbook = true;
                   lastbook = new Date();
                   var localTime = lastbook.getTime();
                   var localOffset = lastbook.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
                   var utc = localTime + localOffset; //utc即GMT时间
                   var offset = 8; 
                   var hawaii = utc + (3600000 * offset);
                   var nd = new Date(hawaii);
                   lastHour = nd.getHours();
                   positions = '';
                }
               }else if(data.ch === 'tm'){
                    console.log(data.name+":"+data.content);
                    positions+=data.content;
               }else if (data.ch === ch) {
               //console.log(data.name+":"+data.content);
               if (new Date().getTime() - lastchat.getTime() > 1000 * 8 && data.name!="" && data.name!="江湖精灵") {
                    if(data.name==="咬人的馒头"){
                     console.log(data.name+":"+data.content);
                     newbook = true;
                     lastbook = new Date();
                     var localTime = lastbook.getTime();
                     var localOffset = lastbook.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
                     var utc = localTime + localOffset; //utc即GMT时间
                     var offset = 8; 
                     var hawaii = utc + (3600000 * offset);
                     var nd = new Date(hawaii);
                     lastHour = nd.getHours();
                    }
                   //console.log(data.name+"::"+data.content);
                   var content = data.content.trim().toLowerCase();
                   // if (content === "wkzn" || content == "k") {
                   //     await session.sendAsync(`${ch} 目前的挖矿指南是+${current}已持续${GetZNTimes()}`);
                   //     lastchat = new Date();
                   // }
                   if (content === "boss" ||content === "b" ){
                       if(newbook){
                           if(new Date().getTime() - lastbook.getTime() >= 1000 * 60*10){
                            positions = '';
                           }
                            console.log(`${GetChinaTime()}`+positions);
                       }else{
                            console.log(`${ch} 抱歉，我刚升级完毕,将等待下一个BOSS出现后开始计时。`);
                       }
                       lastchat = new Date();
                   }
               }
           }
       }
       session.on('msg', processMsg);

       while (true) {
           if (this.isCancellationRequested) {
               session.removeListener('msg', processMsg);
               break;
           }
           await Promise.delay(1000 * 60 * 1);
           await session.sendAsync("look");
       }
    }

}