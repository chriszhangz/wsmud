import { Session } from '../../core';
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";

const pty = "pty";
export class ShengJiTask extends Task {

    constructor(
        private taskPath: string[],
        private masterName: string,
        private tokenId: string,
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
            const master = session.world.items.find(i => i && i.name.endsWith(self.masterName))

            if (master) {   
                //console.log(new Date() + "任务开始..")
                //await session.sendAsync(`bai ${master.id}`);
                await Promise.delay(500);
                await session.sendAsync(`${pty} 开始学习 ${self.tokenId}..`);

                    //console.log(new Date() + "excute任务..")
                    await session.sendAsync(`xue ${self.tokenId} from ${master.id}`);
                    await Promise.delay(1000);
                    
                self.priority=-1;
                return;
            }
   
        }

        // async function processMessage(msg: string) {
        //     //console.log(msg);
        //     var matches;
        //     if ((matches = endJob.exec(msg)) != null) {
        //         //self.priority = -1;    
        //         shimen=1;
        //         //console.log(new Date() + "师门完成..")
        //         //console.log(new Date() + "任务完成!!!!!!!!!!!!!!!!!")
        //         return;
        //     }
        //     if(msgs.length<10){
        //         msgs.push(msg);
        //     }else{
        //         msgs.shift();
        //         msgs.push(msg);
        //     }
        // };
        
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
        //session.on('message', processMessage);
        //session.on('data', processData);
        //session.on('msg', processMsg);
        //await Promise.delay(1050);
        await callback();
        this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                //session.removeListener('message', processMessage);
                //session.removeListener('data', processData);
                //session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }


}


