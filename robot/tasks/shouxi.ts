import { Session } from '../../core';
import { Data } from "../../core/data";
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";


export class ShouxiTask extends Task {

    constructor(
        private taskPath: string,
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
            var paths: string[] = self.taskPath.split(";");
            for (let i = 0; i < paths.length; i++) {
                await session.sendAsync(paths[i]);
            }
            //await session.sendAsync(self.taskPath);
            await Promise.delay(5050);
            await session.sendAsync("tasks");
            const master = session.world.items.find(i => i && i.name.endsWith(self.masterName))

            if (master) {
                console.log(new Date() + "任务开始..")
                //var cmds: string[] = [];
                for (let i = 0; i < 20; i++) {
                    await session.sendAsync(`task sm ${master.id}`);
                    await session.sendAsync(`task sm ${master.id} give ${self.tokenId}`);
                }

                // for (let i = 0; i < 4; i++) {
                //     await session.sendAsync(cmds);
                // }
                await Promise.delay(1000);
                for (let i = 0; i < 20; i++) {
                    await session.sendAsync(`task sm ${master.id}`);
                    await session.sendAsync(`task sm ${master.id} give ${self.tokenId}`);
                }
                // for (let i = 0; i < 4; i++) {
                //     await session.sendAsync(cmds);
                // }
            }
            await session.sendAsync("tasks");
            console.log(new Date() + "任务完成..")
            await Promise.delay(5000);
            await session.sendAsync("jh fam 0 start");
            await session.sendAsync("go west");
            await session.sendAsync("go west");
            await session.sendAsync("go west");
            await session.sendAsync("go west");
            await session.sendAsync("wa");
            await Promise.delay(5000);
        }

       
        //await callback()            
        console.log(`${new Date()} job start`);
        this.priority = -1;        

        while (true) {
            // if (this.isCancellationRequested) {
            //     session.removeListener('message', processMessage);
            //     session.removeListener('data', processData);
            //     //session.removeListener('msg', processMsg);
            //     break;
            // }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
        
    }

    
}


