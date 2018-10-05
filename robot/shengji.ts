

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
        //let cmds: string[] = ['jh fam 3 start','go westup','go north','go north'];        //岳不群
        //let cmds: string[] = ['jh fam 3 start','go eastup','go southup','jumpdown','go southup','go south','go east'];     //封不平
        let cmds: string[] = ['jh fam 3 start','go westup','go south','go southup','go southup','break bi','go enter','go westup','go westup'];  //风清扬
        //let cmds: string[] = ['jh fam 0 start','go west','go west','go north','go enter','go west'];       //练功房
        //let cmds: string[] = ['jh fam 0 start','go south','go south','go east','go east','go east','go north'];
        //let cmds: string[] = ['jh fam 0 start'];
        //let cmds: string[] = ['jh fam 3 start'];
        let master:string = '风清扬';
        //let wugong:string = 'dodge';
        let wugong:string = 'parry';
        //let wugong:string = 'force';
        //let wugong:string = 'unarmed';
        //let wugong:string = 'huashanxinfa';
        //let wugong:string = 'poyuquan';
        //let wugong:string = 'kuangfengkuaijian';
        //let wugong:string = 'feiyanhuixiang';
        //let wugong:string = 'huashanjianfa';
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
        //await new TaskSchedule(config.tasks, session, config).Run();          
        
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
        console.log("begin ......................................" + config.name);
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
        
        // config = {key: "test4",name: "宗政鲛众",server: 2,account: {code: "apollozz5",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();  

        // config = {key: "test4",name: "戚弩",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();  

        // config = {key: "test4",name: "吕榜",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();  

        // config = {key: "test4",name: "尤琮铿",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();  
        
        // config = {key: "test4",name: "邹子仝",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();  
        
        // config = {key: "test4",name: "韩宪炜",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();  

        // config = {key: "test4",name: "韩宪炜",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();    

        // config = {key: "test4",name: "金浩振一",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();    

        // config = {key: "test4",name: "金浩振二",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();      

        // config = {key: "test4",name: "金浩振三",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();      

        // config = {key: "test4",name: "金浩振四",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();         

        // config = {key: "test4",name: "金浩振五",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShengJiTask(cmds, master, wugong, new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();      

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
