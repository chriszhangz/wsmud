

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
        
        config = {key: "test4",name: "赵鲛帝",server: 2,account: {code: "apollozz1",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "h1ca2a324ec", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          

        config = {key: "test4",name: "彭轩宽",server: 2,account: {code: "huashanwushi",pwd: "jiqiren"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "91ql2b1d127", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();    
        config = {key: "test4",name: "魏磊征",server: 2,account: {code: "huashanwushi",pwd: "jiqiren"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "wvrl2b1d1a3", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();    
        config = {key: "test4",name: "何魁晸",server: 2,account: {code: "huashanwushi",pwd: "jiqiren"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "7rrn2b1d225", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();    
        config = {key: "test4",name: "吕曾守",server: 2,account: {code: "huashanwushi",pwd: "jiqiren"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "3trc2b1d28d", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();    
        config = {key: "test4",name: "轩辕闻",server: 2,account: {code: "huashanwushi",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "xl4j2b1d31a", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();                                            
        //BOSS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        config = {key: "test4",name: "施珺",server: 2,account: {code: "apollozzzz",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 5 start", "苏星河", "sa512a64ea9", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();  
                
        config = {key: "test4",name: "卫俣列",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "b1xr2928719", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();                  

        config = {key: "test4",name: "彭飒俯",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "p2b02a63a1f", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "葛僧",server: 2,account: {code: "apollozz3",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "92382a63a3e", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "苏矢亮",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "3if02a63a5c", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "秦储朗",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "hdwp2a63a7c", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "蒋川风",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "gd0a2a63a9b", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          
        
        config = {key: "test4",name: "赫连侃璟",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "7xw42a63ab5", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();          

        config = {key: "test4",name: "巫马碧",server: 2,account: {code: "apollozz4",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "q36w2a64cf5", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();   

        config = {key: "test4",name: "窦封",server: 2,account: {code: "apollozz5",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "9rnu2a93695", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();  
        
        config = {key: "test4",name: "宗政鲛众",server: 2,account: {code: "apollozz5",pwd: "1982525"},
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明", "05wo2a7d49c", new Date(2018, 4, 21))
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();  

        console.log("ALL JOBS DONE !!!!!!!!!!!!!!!!!!!!!!!!");
    }
    //var rule = new RecurrenceRule();
    //var rule = new schedule.RecurrenceRule();
    var CronJob = require('cron').CronJob;
    new CronJob('00 30 14 * * *', async function() {
        await callback();
      }, null, true, 'America/Los_Angeles');

}

start();
