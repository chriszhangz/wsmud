import { Session } from '../../core';
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";

//const pty = "pty";
const waitJob = /你想趁人之危吗/;
const endJob = /承让/;
const endJob2 = /阁下武艺不凡/;
const endJob3 = /知道我的厉害了吧/;
const endJob4 = /佩服！/;
let masterid="";
export class XineiTask extends Task {

    constructor(
        private taskPath: string[],
        private masterName: string,
        firstChiefDate: Date
    ) {
        super();
        this.firstChiefTime = new Date(
            firstChiefDate.getFullYear(),
            firstChiefDate.getMonth(),
            firstChiefDate.getDate())
            .getTime();
        this.priority = 100;
    }

    firstChiefTime: number;

    basePriority: number;

    async  start(session: Session, config: UserConfig) {
        var self = this;
        async function callback() {
            await session.sendAsync("stopstate");
            for (let i = 0; i < self.taskPath.length; i++) {
                //console.log('Execute:'+cmdss[i].content);
                await session.sendAsync(self.taskPath[i]);
                await Promise.delay(500);
            }
            // await session.sendAsync("jh fam 0 start");
            // await session.sendAsync("go south");
            // await session.sendAsync("go south");
            // await session.sendAsync("go west");
            // await Promise.delay(1050);
            let master = session.world.items.find(i => i && i.name.endsWith(self.masterName))
            let waitTimes=0
            while(master==null){
                
                await Promise.delay(1000);
                if(waitTimes>5){      
                    console.log('Can\'t find master...');
                    break;
                }
                master = session.world.items.find(i => i && i.name.endsWith(self.masterName))
                waitTimes++;
            }
            if (master) {   
                //await session.sendAsync(`setting auto_work 1`);
                //await session.sendAsync(`enable force zixiashengong`);
                //console.log(new Date() + "任务开始..")
                //await Promise.delay(500);
                //await session.sendAsync(`bai ${master.id}`);
                
                await Promise.delay(4000);
                //await session.sendAsync(`zhounian ${master.id}`);
                //console.log(new Date() + "excute任务..")
                //await session.sendAsync(`${pty} 开始学习 ${self.tokenId}..`);
                await session.sendAsync(`fight ${master.id}`);
                masterid=master.id;
                //await session.sendAsync(`lianxi ${self.tokenId}`);
                
                //await session.sendAsync(`enable force huashanxinfa`);
                //await Promise.delay(500);
                //await session.sendAsync(`levelup ${master.id}`);
                await Promise.delay(1000);
                    
                // self.priority=-1;
                // return;
            }
            //await session.sendAsync(`lianxi ${self.tokenId}`);
            //await session.sendAsync(`${pty} 开始打坐..`);
            //await session.sendAsync(`enable force huashanxinfa`);
            // await session.sendAsync(`enable sword huashanjianfa`);
            // await session.sendAsync(`enable unarmed poyuquan`);
            // await session.sendAsync(`enable parry poyuquan`);
            // await session.sendAsync(`enable dodge feiyanhuixiang`);
            //await session.sendAsync(`enable force zixiashengong`);
            // await session.sendAsync(`dazuo`);
            // self.priority=-1;
            // return;
   
        }

        async function processMessage(msg: string) {
            var matches;
            console.log(msg);
            if ((matches = endJob.exec(msg)) != null||(matches = endJob2.exec(msg)) != null||(matches = endJob3.exec(msg)) != null||(matches = endJob4.exec(msg)) != null) {
                await Promise.delay(5000);
                await session.sendAsync(`fight ${masterid}`);
                //console.log(new Date() + "师门完成..")
                //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
                //return;
            }
            if ((matches = waitJob.exec(msg)) != null){
                await Promise.delay(1000);
                await session.sendAsync(`fight ${masterid}`);
            }
        };
        
        // async function processData(data: Data) {
        //     if (data.type==='dialog'&&data.dialog === "pack") {
        //         if(data.name&&data.name.indexOf('养精丹')>=0){
        //         //console.log(new Date() + "************************************使用养精丹 ..");
        //         await session.sendAsync(`use ${data.id}`);
        //         }
        //     }
        // };
        // cron.scheduleJob("55 0 5 * * *", async fireDate => {
        //     var isChiefDate = this.isChiefDate(fireDate);
        //     if (isChiefDate) {
        //         await callback()
        //     }
        // });
        // cron.scheduleJob("5 0 20 * * *", async fireDate => {
        //     var isChiefDate = this.isChiefDate(fireDate);
        //     if (!isChiefDate) {
        //         await callback()
        //     }
        // });
        session.on('message', processMessage);
        //session.on('data', processData);
        //session.on('msg', processMsg);
        //await Promise.delay(1050);
        await callback();
        //this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                //session.removeListener('data', processData);
                //session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }


}


