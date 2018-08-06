

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
        config = {
            key: "test4",
            name: "邹有竦",
            server: 2,
            account: {
                code: "apollozz1",
                pwd: "1982525"
            },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();

        config = {key: "test4",name: "拓拔骏帅",server: 2,account: {code: "apollozz1",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();

        config = {key: "test4",name: "杨利挺",server: 2,account: {code: "apollozz2",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "l3p62927654", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();

        config = {key: "test4",name: "赫连前彰",server: 2,account: {code: "apollozz2",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "278j29276d0", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();        

        config = {key: "test4",name: "柏孺",server: 2,account: {code: "apollozz2",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "wetg2927740", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();         

        config = {key: "test4",name: "公冶涵俣",server: 2,account: {code: "apollozz2",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "vwz929277c4", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();           

        config = {key: "test4",name: "邹风佺",server: 2,account: {code: "apollozz2",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "gm4t2927833", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();    
      
        config = {key: "test4",name: "夹谷参",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "wm4p2928691", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();  

        config = {key: "test4",name: "夹谷灏",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "gs6z29286ca", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        console.log("ALL JOBS DONE !!!!!!!!!!!!!!!!!!!!!!!!");
    }
    //var rule = new RecurrenceRule();
    //var rule = new schedule.RecurrenceRule();
    var CronJob = require('cron').CronJob;
    new CronJob('00 30 09 * * *', async function() {
        await callback();
      }, null, true, 'America/Los_Angeles');

}

start();
