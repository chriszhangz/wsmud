

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
        let cmds: string[] = ['jh fam 3 start','go westup','go north','go north'];
        let master:string = '岳不群';
        //let wugong:string = 'poyuquan';
        let wugong:string = 'feiyanhuixiang';
        //let wugong:string = 'huashanjianfa';
        //let wugong:string = 'huashanxinfa';
        //let wugong:string = 'zixiashengong';
        let config: UserConfig = {
            key: "test4",
            name: "卫俣列",
            server: 2,
            account: {
                code: "apollozz3",
                pwd: "1982525"
            },
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        await new TaskSchedule(config.tasks, session, config).Run();
                                         
        //BOSS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                          

        config = {key: "test4",name: "彭飒俯",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "葛僧",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "苏矢亮",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "秦储朗",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "蒋川风",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "赫连侃璟",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          

        config = {key: "test4",name: "巫马碧",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();   

        config = {key: "test4",name: "窦封",server: 2,account: {code: "apollozz5",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();  
        
        config = {key: "test4",name: "宗政鲛众",server: 2,account: {code: "apollozz5",pwd: "1982525"},
            tasks: [
                new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
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
