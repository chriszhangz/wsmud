import { Session } from '../../core';
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";
import * as cron from "node-schedule";

const ONE_DAY_MS = 86400000;
export class SmTask extends Task {

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
    }

    firstChiefTime: number;

    basePriority: number;

    async  start(session: Session, config: UserConfig) {
        var self = this;
        async function callback() {
            await session.sendAsync("tasks;stopstate");
            await session.sendAsync(self.taskPath);
            await Promise.delay(5050);
            await session.sendAsync("tasks");
            const master = session.world.items.find(i => i && i.name.endsWith(self.masterName))

            if (master) {
                console.log(new Date() + "任务开始..")
                var cmds: string[] = [];
                for (let i = 0; i < 5; i++) {
                    cmds.push(`task sm ${master.id}`);
                    cmds.push(`task sm ${master.id} give ${self.tokenId}`);
                }

                for (let i = 0; i < 4; i++) {
                    await session.sendAsync(cmds);
                }
                await Promise.delay(1000);
                for (let i = 0; i < 4; i++) {
                    await session.sendAsync(cmds);
                }
            }
            await session.sendAsync("tasks");
            console.log(new Date() + "任务完成..")
            await Promise.delay(5000);
            await session.sendAsync("jh fam 0 start;go west;go west;go west;go west;wa");
            await Promise.delay(5000);
        }


        cron.scheduleJob("55 0 5 * * *", async fireDate => {
            var isChiefDate = this.isChiefDate(fireDate);
            if (isChiefDate) {
                await callback()
            }
        });
        cron.scheduleJob("5 0 20 * * *", async fireDate => {
            var isChiefDate = this.isChiefDate(fireDate);
            if (!isChiefDate) {
                await callback()
            }
        });
    }

    private isChiefDate(fireDate: Date) {
        const today = new Date(fireDate.getFullYear(), fireDate.getMonth(), fireDate.getDate()).getTime();
        var days = (today - this.firstChiefTime) / ONE_DAY_MS;
        var offset = (days & 1) == 0;
        console.log(`${fireDate} ${offset ? 'is' : 'is not'} chief date`);
        return offset;
    }
}


