

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
        //let cmds: string[] = ['jh fam 0 start','go south','go south','go west'];
        let cmds: string[] = ['jh fam 3 start','go westup','go north','go north'];        //岳不群
        //let cmds: string[] = ['jh fam 3 start','go eastup','go southup','jumpdown','go southup','go south','go east'];     //封不平
        //let cmds: string[] = ['jh fam 3 start','go westup','go south','go southup','go southup','break bi','go enter','go westup','go westup'];  //风清扬
        //let cmds: string[] = ['jh fam 0 start','go west','go west','go north','go enter','go west'];       //练功房
        //let cmds: string[] = ['jh fam 0 start','go south','go south','go east','go east','go east','go north'];
        //let cmds: string[] = ['jh fam 0 start','climb tree'];
        //let cmds: string[] = ['jh fam 3 start'];
        //let master:string = '金古易';
        let master:string = '岳不群';
        //let wugong:string = 'sword';
        //let wugong:string = 'dodge';
        //let wugong:string = 'parry';
        //let wugong:string = 'force';
        //let wugong:string = 'unarmed';
        //let wugong:string = 'sword';
        //let wugong:string = 'huashanxinfa';
        //let wugong:string = 'poyuquan';
        //let wugong:string = 'kuangfengkuaijian';
        //let wugong:string = 'feiyanhuixiang';
        //let wugong:string = 'dugujiujian';
        //let wugong:string = 'huashanjianfa';
        //let wugong:string = 'zixiashengong';
        let config: UserConfig = {
            key: "test4",
            name: "咬人的豆包",
            server: 2,
            account: {
                code: "apollozzz",
                pwd: "1982525"
            },
            tasks: [
                new tasks.XineiTask(cmds, master, new Date(2018, 4, 21))
            ]
        }
        console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        //await new TaskSchedule(config.tasks, session, config).Run();
        await new TaskSchedule(config.tasks, session, config).Run();
           

        console.log("ALL JOBS DONE !!!!!!!!!!!!!!!!!!!!!!!!");
    }
    await callback();
    //var rule = new RecurrenceRule();
    //var rule = new schedule.RecurrenceRule();
    // var CronJob = require('cron').CronJob;
    // new CronJob('00 30 14 * * *', async function() {
    //     await callback();
    //   }, null, true, 'America/Los_Angeles');

}

start();
