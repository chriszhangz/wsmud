

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
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        const server = await selectServer(config);
        const session = new Session(server);
        //运行
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();
        config = {
            key: "test4",
            name: "邹有竦",
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
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();


        config = {
            key: "test4", name: "拓拔骏帅", server: 2, account: { code: "apollozz1", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "杨利挺", server: 2, account: { code: "apollozz2", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "赫连前彰", server: 2, account: { code: "apollozz2", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "柏孺", server: 2, account: { code: "apollozz2", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "公冶涵俣", server: 2, account: { code: "apollozz2", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "邹风佺", server: 2, account: { code: "apollozz2", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "夹谷参", server: 2, account: { code: "apollozz3", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "夹谷灏", server: 2, account: { code: "apollozz3", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "赵鲛帝", server: 2, account: { code: "apollozz1", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "彭轩宽", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();
        config = {
            key: "test4", name: "魏磊征", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();
        config = {
            key: "test4", name: "何魁晸", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();
        config = {
            key: "test4", name: "吕曾守", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();
        config = {
            key: "test4", name: "轩辕闻", server: 2, account: { code: "huashanwushi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "金叔一", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "金叔二", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "金叔三", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "金叔四", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "金叔五", server: 2, account: { code: "huashanzongshi", pwd: "jiqiren" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "讓一招", server: 2, account: { code: "012345670", pwd: "7654321" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "讓倆招", server: 2, account: { code: "012345670", pwd: "7654321" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "讓三招", server: 2, account: { code: "012345670", pwd: "7654321" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "讓四招", server: 2, account: { code: "012345670", pwd: "7654321" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "讓五招", server: 2, account: { code: "012345670", pwd: "7654321" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();


        //BOSS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        config = {
            key: "test4", name: "施珺", server: 2, account: { code: "apollozzzz", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "卫俣列", server: 2, account: { code: "apollozz3", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "彭飒俯", server: 2, account: { code: "apollozz3", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "葛僧", server: 2, account: { code: "apollozz3", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "苏矢亮", server: 2, account: { code: "apollozz4", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "秦储朗", server: 2, account: { code: "apollozz4", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "蒋川风", server: 2, account: { code: "apollozz4", pwd: "1982525" },
            tasks: [
                new tasks.ShimenTask("jh fam 3 start", "高根明")
            ]
        }
        //console.log("begin ......................................" + config.name);
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "申屠辈", server: 2, account: { code: "huashanwushi2", pwd: "jiqiren" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "皇甫佺", server: 2, account: { code: "huashanwushi2", pwd: "jiqiren" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "吴有操", server: 2, account: { code: "huashanwushi2", pwd: "jiqiren" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "王世马", server: 2, account: { code: "huashanwushi2", pwd: "jiqiren" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        config = {
            key: "test4", name: "仲孙煜", server: 2, account: { code: "huashanwushi2", pwd: "jiqiren" },
            tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明")]
        }
        await new TaskSchedule(config.tasks, session, config).Run();
        session.close();

        // config = {key: "test4",name: "赫连侃璟",server: 2,account: {code: "apollozz4",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "7xw42a63ab5", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "巫马碧",server: 2,account: {code: "apollozz4",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "q36w2a64cf5", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "窦封",server: 2,account: {code: "apollozz5",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "9rnu2a93695", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "宗政鲛众",server: 2,account: {code: "apollozz5",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "05wo2a7d49c", new Date(2018, 4, 21))
        //     ]
        // }
        // console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "戚弩",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "nhiz2b73358", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "吕榜",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "dsrw2b731f4", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "尤琮铿",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "csmm2b73353", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "邹子仝",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "sd2h2b73367", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "韩宪炜",server: 2,account: {code: "apollozz6",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "5f652b73362", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "金浩振一",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "mhem2b73353", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "金浩振二",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "j1vi2b7334e", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "金浩振三",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "p7uu2b73339", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "金浩振四",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "ws7b2b7330b", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4",name: "金浩振五",server: 2,account: {code: "apollozz7",pwd: "1982525"},
        //     tasks: [
        //         new tasks.ShimenTask("jh fam 3 start", "高根明", "l8dq2b731ab", new Date(2018, 4, 21))
        //     ]
        // }
        // //console.log("begin ......................................" + config.name);
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔一", server: 2, account: { code: "apollozz8", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔二", server: 2, account: { code: "apollozz8", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔三", server: 2, account: { code: "apollozz8", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔四", server: 2, account: { code: "apollozz8", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔五", server: 2, account: { code: "apollozz8", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔六", server: 2, account: { code: "apollozz9", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔八", server: 2, account: { code: "apollozz9", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔九", server: 2, account: { code: "apollozz9", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔十", server: 2, account: { code: "apollozz9", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "太叔十一", server: 2, account: { code: "apollozz9", pwd: "1982525" },
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "讓六招", server: 2, account: { code: "0123456780", pwd: "87654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "讓七招", server: 2, account: { code: "0123456780", pwd: "87654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "讓八招", server: 2, account: { code: "0123456780", pwd: "87654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "讓九招", server: 2, account: { code: "0123456780", pwd: "87654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "讓十招", server: 2, account: { code: "0123456780", pwd: "87654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "洛玖尧", server: 2, account: { code: "llfxgx", pwd: "497970474"},
        //     tasks: [new tasks.ShimenTask("jh fam 5 start", "苏星河", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "让一套", server: 2, account: { code: "01234560", pwd: "654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "让二套", server: 2, account: { code: "01234560", pwd: "654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "让三套", server: 2, account: { code: "01234560", pwd: "654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "让四套", server: 2, account: { code: "01234560", pwd: "654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "让五套", server: 2, account: { code: "01234560", pwd: "654321"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        // config = {key: "test4", name: "沐倾", server: 2, account: { code: "xiaozhi986", pwd: "860820"},
        //     tasks: [new tasks.ShimenTask("jh fam 3 start", "高根明", "bhb2291736e", new Date(2018, 4, 21))]}
        // await new TaskSchedule(config.tasks, session, config).Run();
        // session.close();

        //session.close();
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
