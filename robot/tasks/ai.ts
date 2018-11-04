import { Session } from '../../core';
import { Data } from "../../core/data";
import { Msg } from '../../core/data';
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";

const endJob = /你先去休息一下吧/;
// const quest = /为师最近突然想尝一下<wht>包子/;
// const quest2 = /我要的是<wht>包子/;
// let shimen = 0;
let msgs = [""];
//const pty = "pty";
export class AiTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    firstChiefTime: number;

    basePriority: number;

    async  start(session: Session, config: UserConfig) {
        // var self = this;
        // async function callback() {
            
            
   
        // }

        async function processMessage(msg: string) {
            //console.log(msg);
            var matches;
            if ((matches = endJob.exec(msg)) != null) {
                //self.priority = -1;    
                //shimen=1;
                //console.log(new Date() + "师门完成..")
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                return;
            }
            if(msgs.length<10){
                msgs.push(msg);
            }else{
                msgs.shift();
                msgs.push(msg);
            }
        };
        
        async function processData(data: Data) {
            if (data.type==='dialog'&&data.dialog === "score") {
                console.log("经验："+data.exp);
                console.log("潜能："+data.pot);
                console.log("当前气血："+data.hp);
                console.log("当前内力："+data.mp);
                //await session.sendAsync(`${pty} 所有任务完毕，小的告退..`);
            }
        };
        async function processMsg(data: Msg) {
            if(data.ch === 'pty'){
                if(data.name==='咬人的豆包'){
                    console.log("收到命令："+data.content);
                    if(data.content.includes('威廉剑')&&data.content.includes('状态')){
                        await session.sendAsync("score");
                    }
                }
            }
        };
        session.on('message', processMessage);
        session.on('data', processData);
        session.on('msg', processMsg);
        // await Promise.delay(5050);
        // await callback();
        // this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }


}


