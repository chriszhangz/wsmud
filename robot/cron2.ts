

// import { test } from "./test";
// test();


import { selectServer } from "./utils";
import { Session } from "../core";
import { UserConfig } from "./interface";
import { TaskSchedule } from "./task-schedule";
import * as tasks from "./tasks";

// const ONE_DAY_MS = 86400000;

// const firstChiefTime = new Date(2018,9,29).getTime();
async function start() {
    async function callback() {
        //const config = getConfig();
        let config: UserConfig = {
            key: "test4",
            name: "咬人的豆包",//咬人的豆包
            server: 2,
            account: {
                code: "apollozzz",
                pwd: "1982525"
            },
            tasks: [
                new tasks.AutoTask2()
                //new tasks.TestTask()
                //new tasks.ShouxiTask("jh fam 5 start;go north", "苏星河", "8wdo2ae4caf", new Date(2018,9,28))
            ]
        }
        //console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        await new TaskSchedule(config.tasks, session, config).Run();
        

        session.close();
    }
    async function callback2() {
        //const config = getConfig();
        let config: UserConfig = {
            key: "test4",
            name: "咬人的馒头",//咬人的豆包
            server: 2,
            account: {
                code: "apollozz",
                pwd: "1982525"
            },
            tasks: [
                new tasks.AutoTask2()
                //new tasks.TestTask()
                //new tasks.ShouxiTask("jh fam 5 start;go north", "苏星河", "8wdo2ae4caf", new Date(2018,9,28))
            ]
        }
        //console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        await new TaskSchedule(config.tasks, session, config).Run();
        

        session.close();
    }
    async function callback3() {
        //const config = getConfig();
        let config: UserConfig = {
            key: "test4",
            name: "半俗",//咬人的豆包
            server: 2,
            account: {
                code: "xiaozhi8124",
                pwd: "jz880514"
            },
            tasks: [
                new tasks.AutoTask2()
                //new tasks.TestTask()
                //new tasks.ShouxiTask("jh fam 5 start;go north", "苏星河", "8wdo2ae4caf", new Date(2018,9,28))
            ]
        }
        //console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        await new TaskSchedule(config.tasks, session, config).Run();
        

        session.close();
    }    
    //callback()
    //var rule = new RecurrenceRule();
    //var rule = new schedule.RecurrenceRule();
    var CronJob = require('cron').CronJob;
    new CronJob('00 55 17,18,19,20,21 * * *', async function () {
    //new CronJob('00 24,30 15 * * *', async function () {        
        //await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
        //console.log("start !");
        //await callback(self);
        callback();
        //callback2();
        callback3();
    }, null, true, 'Asia/Shanghai');
    // new CronJob('55 0 14 * * *', async function() {
    //     const today = new Date();
    //     var days = (today.getTime() - firstChiefTime) / ONE_DAY_MS;
    //     console.log(`days:${days}`);
    //     var offset = (days & 1) == 0;

    //     console.log(`${today} ${offset ? 'is' : 'is not'} chief date`);
    //     if(!offset){
    //         //console.log(`do 20 clock job`);
    //         await callback();
    //     }
    //   }, null, true, 'America/Los_Angeles');

    //   new CronJob('5 0 5 * * *', async function() {
    //     const today = new Date();
    //     var days = (today.getTime() - firstChiefTime) / ONE_DAY_MS;
    //     console.log(`days:${days}`);
    //     var offset = (days & 1) == 0;
    //     console.log(`${today} ${offset ? 'is' : 'is not'} chief date`);
    //     if(offset){
    //         //console.log(`do 5 clock job`);
    //         await callback();
    //     }
    //   }, null, true, 'America/Los_Angeles');      

      
}

start();


