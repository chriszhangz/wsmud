"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const task_1 = require("../task");
const cron = require("node-schedule");
const ONE_DAY_MS = 86400000;
class SmTask extends task_1.Task {
    constructor(taskPath, masterName, tokenId, firstChiefDate) {
        super();
        this.taskPath = taskPath;
        this.masterName = masterName;
        this.tokenId = tokenId;
        this.firstChiefTime = new Date(firstChiefDate.getFullYear(), firstChiefDate.getMonth(), firstChiefDate.getDate())
            .getTime();
    }
    async start(session, config) {
        var self = this;
        async function callback() {
            await session.sendAsync("tasks;stopstate");
            await session.sendAsync(self.taskPath);
            await bluebird_1.Promise.delay(5050);
            await session.sendAsync("tasks");
            const master = session.world.items.find(i => i && i.name.endsWith(self.masterName));
            if (master) {
                console.log(new Date() + "任务开始..");
                var cmds = [];
                for (let i = 0; i < 5; i++) {
                    cmds.push(`task sm ${master.id}`);
                    cmds.push(`task sm ${master.id} give ${self.tokenId}`);
                }
                for (let i = 0; i < 4; i++) {
                    await session.sendAsync(cmds);
                }
                await bluebird_1.Promise.delay(1000);
                for (let i = 0; i < 4; i++) {
                    await session.sendAsync(cmds);
                }
            }
            await session.sendAsync("tasks");
            console.log(new Date() + "任务完成..");
            await bluebird_1.Promise.delay(5000);
            await session.sendAsync("jh fam 0 start;go west;go west;go west;go west;wa");
            await bluebird_1.Promise.delay(5000);
        }
        cron.scheduleJob("55 0 5 * * *", async (fireDate) => {
            var isChiefDate = this.isChiefDate(fireDate);
            if (isChiefDate) {
                await callback();
            }
        });
        cron.scheduleJob("5 0 20 * * *", async (fireDate) => {
            var isChiefDate = this.isChiefDate(fireDate);
            if (!isChiefDate) {
                await callback();
            }
        });
    }
    isChiefDate(fireDate) {
        const today = new Date(fireDate.getFullYear(), fireDate.getMonth(), fireDate.getDate()).getTime();
        var days = (today - this.firstChiefTime) / ONE_DAY_MS;
        var offset = (days & 1) == 0;
        console.log(`${fireDate} ${offset ? 'is' : 'is not'} chief date`);
        return offset;
    }
}
exports.SmTask = SmTask;
//# sourceMappingURL=sm.js.map