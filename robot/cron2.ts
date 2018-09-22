

// import { test } from "./test";
// test();


import { selectServer } from "./utils";
import { Session } from "../core";
import { UserConfig } from "./interface";
import { TaskSchedule } from "./task-schedule";
import * as tasks from "./tasks";

async function start() {
    async function callback() {
        //const config = getConfig();
        let config: UserConfig = {
            key: "test4",
            name: "戚镰剑",
            server: 2,
            account: {
                code: "apollozz1",
                pwd: "1982525"
            },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
            ]
        }
        console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        await new TaskSchedule(config.tasks, session, config).Run();
        


        console.log("ALL JOBS DONE !!!!!!!!!!!!!!!!!!!!!!!!");
    }
    //var rule = new RecurrenceRule();
    //var rule = new schedule.RecurrenceRule();
    var CronJob = require('cron').CronJob;
    new CronJob('55 0 14 * * *', async function() {
        await callback();
      }, null, true, 'America/Los_Angeles');

}

start();
