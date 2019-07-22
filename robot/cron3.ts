

// import { test } from "./test";
// test();


import { selectServer } from "./utils";
import { Session } from "../core";
import { UserConfig } from "./interface";
import { Promise } from 'bluebird';
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
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        // 运行
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();
        // config = {
        //     key: "test4",
        //     name: "邹有竦",
        //     server: 2,
        //     account: {
        //         code: "apollozz1",
        //         pwd: "1982525"
        //     },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();


        // config = {
        //     key: "test4", name: "拓拔骏帅", server: 2, account: { code: "apollozz1", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "杨利挺", server: 2, account: { code: "apollozz2", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "l3p62927654", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "赫连前彰", server: 2, account: { code: "apollozz2", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "278j29276d0", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "柏孺", server: 2, account: { code: "apollozz2", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "wetg2927740", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "公冶涵俣", server: 2, account: { code: "apollozz2", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "vwz929277c4", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "邹风佺", server: 2, account: { code: "apollozz2", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "gm4t2927833", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "夹谷参", server: 2, account: { code: "apollozz3", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "wm4p2928691", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "夹谷灏", server: 2, account: { code: "apollozz3", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "gs6z29286ca", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "赵鲛帝", server: 2, account: { code: "apollozz1", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "24th2b76b29", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "彭轩宽", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "91ql2b1d127", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();
        // config = {
        //     key: "test4", name: "魏磊征", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "wvrl2b1d1a3", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();
        // config = {
        //     key: "test4", name: "何魁晸", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "7rrn2b1d225", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();
        // config = {
        //     key: "test4", name: "吕曾守", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "3trc2b1d28d", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();
        // config = {
        //     key: "test4", name: "轩辕闻", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "xl4j2b1d31a", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "金叔一", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "2zo72f23f7c", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "金叔二", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "8cvn2f2418f", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "金叔三", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "z6zk2f3a8d0", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "金叔四", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "9j5t2fd92bb", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "金叔五", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "3uj42fd93da", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "讓一招", server: 2, account: { code: "012345670", pwd: "7654321" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "czz22fe21b4", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "讓倆招", server: 2, account: { code: "012345670", pwd: "7654321" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "net52fe24a7", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "讓三招", server: 2, account: { code: "012345670", pwd: "7654321" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "hr8k2fe24fa", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "讓四招", server: 2, account: { code: "012345670", pwd: "7654321" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "pmir2fe254a", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "讓五招", server: 2, account: { code: "012345670", pwd: "7654321" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "2qat2fe259c", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();


        // //BOSS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // config = {
        //     key: "test4", name: "施珺", server: 2, account: { code: "apollozzzz", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 5 start", "苏星河", "u0ww2b77dcd", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "卫俣列", server: 2, account: { code: "apollozz3", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "zrxu2e16b52", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "彭飒俯", server: 2, account: { code: "apollozz3", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "p2b02a63a1f", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "葛僧", server: 2, account: { code: "apollozz3", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "92382a63a3e", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "苏矢亮", server: 2, account: { code: "apollozz4", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "3if02a63a5c", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "秦储朗", server: 2, account: { code: "apollozz4", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "hdwp2a63a7c", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        // config = {
        //     key: "test4", name: "蒋川风", server: 2, account: { code: "apollozz4", pwd: "1982525" },
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "gd0a2a63a9b", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // new TaskSchedule(config.tasks, session, config).Run();
        // await Promise.delay(1000 * 60 * 10);
        // session.close();

        config = {
            key: "test4", name: "七羽", server: 2, account: { code: "llfxgx", pwd: "497970474" },
            tasks: [new tasks.ShimenTask("jh fam 4 start;go west", "苏梦清")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "赫连侃璟", server: 2, account: { code: "apollozz4", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "巫马碧", server: 2, account: { code: "apollozz4", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "窦封", server: 2, account: { code: "apollozz5", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "宗政鲛众", server: 2, account: { code: "apollozz5", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "戚弩", server: 2, account: { code: "apollozz6", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "吕榜", server: 2, account: { code: "apollozz6", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "尤琮铿", server: 2, account: { code: "apollozz6", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "邹子仝", server: 2, account: { code: "apollozz6", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "韩宪炜", server: 2, account: { code: "apollozz6", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "金浩振一", server: 2, account: { code: "apollozz7", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "金浩振二", server: 2, account: { code: "apollozz7", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "金浩振三", server: 2, account: { code: "apollozz7", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "金浩振四", server: 2, account: { code: "apollozz7", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "金浩振五", server: 2, account: { code: "apollozz7", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔一", server: 2, account: { code: "apollozz8", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔二", server: 2, account: { code: "apollozz8", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔三", server: 2, account: { code: "apollozz8", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔四", server: 2, account: { code: "apollozz8", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔五", server: 2, account: { code: "apollozz8", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔六", server: 2, account: { code: "apollozz9", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔八", server: 2, account: { code: "apollozz9", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔九", server: 2, account: { code: "apollozz9", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔十", server: 2, account: { code: "apollozz9", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "太叔十一", server: 2, account: { code: "apollozz9", pwd: "1982525" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "讓六招", server: 2, account: { code: "0123456780", pwd: "87654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "讓七招", server: 2, account: { code: "0123456780", pwd: "87654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "讓八招", server: 2, account: { code: "0123456780", pwd: "87654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "讓九招", server: 2, account: { code: "0123456780", pwd: "87654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "讓十招", server: 2, account: { code: "0123456780", pwd: "87654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        // config = {key: "test4", name: "洛玖尧", server: 2, account: { code: "llfxgx", pwd: "497970474"},
        //     tasks: [new tasks.ShimenTask("jh fam 5 start", "苏星河", "bhb2291736e", new Date(2018, 4, 21))]}
        // new TaskSchedule(config.tasks, session, config).Run();
        //await Promise.delay(1000 * 60 * 10);
        //session.close();

        config = {
            key: "test4", name: "让一套", server: 2, account: { code: "01234560", pwd: "654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让二套", server: 2, account: { code: "01234560", pwd: "654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让三套", server: 2, account: { code: "01234560", pwd: "654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让四套", server: 2, account: { code: "01234560", pwd: "654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让五套", server: 2, account: { code: "01234560", pwd: "654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "沐倾", server: 2, account: { code: "xiaozhi986", pwd: "860820" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你一招", server: 2, account: { code: "0123450", pwd: "123456" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你两招", server: 2, account: { code: "0123450", pwd: "123456" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你三招", server: 2, account: { code: "0123450", pwd: "123456" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你四招", server: 2, account: { code: "0123450", pwd: "123456" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你五招", server: 2, account: { code: "0123450", pwd: "123456" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你六招", server: 2, account: { code: "q123456789p", pwd: "987654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你七招", server: 2, account: { code: "q123456789p", pwd: "987654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你八招", server: 2, account: { code: "q123456789p", pwd: "987654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你九招", server: 2, account: { code: "q123456789p", pwd: "987654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "让你十招", server: 2, account: { code: "q123456789p", pwd: "987654321" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "你也不懂", server: 2, account: { code: "look5454", pwd: "22369210" },
            tasks: [new tasks.ShimenTask("jh fam 0 start;go south;go south;go west", "武馆教习")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        config = {
            key: "test4", name: "我也不懂", server: 2, account: { code: "look5454", pwd: "22369210" },
            tasks: [new tasks.ShimenTask("jh fam 7 start;go north", "何小二")]
        }
        new TaskSchedule(config.tasks, session, config).Run();
        await Promise.delay(1000 * 60 * 10);
        session.close();

        //console.log("ALL JOBS DONE !!!!!!!!!!!!!!!!!!!!!!!!");
    }
    //var rule = new RecurrenceRule();
    //var rule = new schedule.RecurrenceRule();
    //await callback();
    var CronJob = require('cron').CronJob;
    new CronJob('00 15 05 * * *', async function () {
        await callback();
    }, null, true, 'Asia/Shanghai');

}

start();
