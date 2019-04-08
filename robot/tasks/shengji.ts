import { Session } from '../../core';
import { Data } from "../../core/data";
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";

//const pty = "pty";
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
            let master = session.world.items.find(i => i && i.name.endsWith(self.masterName))
            let waitTimes=0
            // while(master==null){
                
            //     await Promise.delay(1000);
            //     if(waitTimes>5){      
            //         console.log('Can\'t find master...');
            //         break;
            //     }
            //     master = session.world.items.find(i => i && i.name.endsWith(self.masterName))
            //     waitTimes++;
            // }
            if (master) {   
                //await session.sendAsync(`setting auto_work 1`);
                //await session.sendAsync(`enable force zixiashengong`);
                //console.log(new Date() + "任务开始..")
                //await Promise.delay(500);
                //await session.sendAsync(`bai ${master.id}`);
                await session.sendAsync(`setting auto_work xue poyuquan from ${master.id},xue zixiashengong from ${master.id},jh fam 0 start,go west,go west,go north,go enter,go west,lianxi force 937,lianxi zixiashengong 937,dazuo`);
                //await Promise.delay(1500);
                //await session.sendAsync(`give ${master.id} 1000 cash`);
                //await session.sendAsync(`zhounian ${master.id}`);
                //console.log(new Date() + "excute任务..")
                //await session.sendAsync(`${pty} 开始学习 ${self.tokenId}..`);
                await session.sendAsync(`xue ${self.tokenId} from ${master.id}`);
                //await session.sendAsync(`lianxi ${self.tokenId}`);
                
                //await session.sendAsync(`enable force huashanxinfa`);
                //await Promise.delay(500);
                //await session.sendAsync(`levelup ${master.id}`);
                //await Promise.delay(1000);
                // await session.sendAsync(`taskover zz1`);
                // await Promise.delay(1500);
                // await session.sendAsync(`shop 2 2`);
                // await Promise.delay(1500);
                // //console.log(`list ${master.id}`);
                // await session.sendAsync(`list ${master.id}`);
                // await Promise.delay(2000);
                    
                self.priority=-1;
                return;
            }
            //await session.sendAsync(`wakuang`);
            // //await session.sendAsync(`lianxi ${self.tokenId}`);
            // //await session.sendAsync(`${pty} 开始打坐..`);
            // //await session.sendAsync(`enable force huashanxinfa`);
            // // await session.sendAsync(`enable sword huashanjianfa`);
            //  await session.sendAsync(`enable unarmed poyuquan`);
            //  await session.sendAsync(`enable parry poyuquan`);
            // // await session.sendAsync(`enable dodge feiyanhuixiang`);
            // // await session.sendAsync(`enable sword kuangfengkuaijian`);
            // // await session.sendAsync(`enable dodge kuangfengkuaijian`);
            // await session.sendAsync(`enable force zixiashengong`);
            await session.sendAsync(`setting auto_work lianxi force 937,lianxi zixiashengong 937,dazuo`);
             await session.sendAsync(`dazuo`);
            // //await session.sendAsync(`xiulian`);
            // //await session.sendAsync(`fenpei`);
            // //await session.sendAsync(`chat 0 0 0 10`);
            // //await session.sendAsync(`ok`);
            // self.priority=-1;
            // return;
                self.priority=-1;
                return;
   
        }

        async function processMessage(msg: string) {
            console.log(msg);

        };
        
         async function processData(data: Data) {
            //console.log(JSON.stringify(data, null, 4));
            if (data.type==='dialog'&&data.dialog === "pack") {
                if(data.name&&data.name.indexOf('背包扩充石')>=0){
                //console.log(new Date() + "************************************使用背包扩充石 ..");
                await session.sendAsync(`use ${data.id}`);
                await session.sendAsync(`use ${data.id}`);
                }else if(data.name&&data.name.indexOf('感恩回馈礼包')>=0){
                    await session.sendAsync(`open ${data.id}`);
                }
            }else if(data.type==='dialog'&&data.dialog === "list"){
                //console.log(new Date() + "************************************获取列表 ..");
                for(const item in data.selllist){
                    if(data.selllist[item].name.indexOf("包子")>=0)
                    {
                    //console.log('找到包子:'+data.selllist[item].name);
                    await session.sendAsync(`buy 10000 ${data.selllist[item].id} from ${data.seller}`);
                    self.priority=-1;
                    return;
                    }
                }
            }

         };
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
        session.on('data', processData);
        //session.on('msg', processMsg);
        //await Promise.delay(1050);
        await callback();
        this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                //session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }


}


