import { UserConfig } from '../interface';
import { Session } from '../../core';
import { Msg,Data } from '../../core/data';
import { Promise } from "bluebird";
import { Task } from "../task";

//const r = /<hig>你获得了(\d+)点/;
const bangpaizhan = /成员听令，即刻起开始进攻/;


export class ChrisTask3 extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    async start(session: Session, config: UserConfig) {


        let partyWar = 0;
        //const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        const ch = "chat";
        //const ch = "pty";
        const pty = "pty";

        

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
            if(data.ch === 'pty'){
                //console.log(data.name+":"+data.content);
                var matches;
                if((matches = bangpaizhan.exec(data.content)) != null){
                    await session.sendAsync(`${pty} 帮派战计时开始`);
                    partyWar=1;
                    processPartyWar();
                 }
                if(data.content.includes("接下来的一小时所有弟子练习效率提高")){
                    await session.sendAsync(`${pty} 帮派战计时结束`);
                    partyWar=0;
                }
            }
        }



        session.removeAllListeners('msg');
        session.on('msg', processMsg);

        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeAllListeners('msg');
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }
}





