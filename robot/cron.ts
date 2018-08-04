

// import { test } from "./test";
// test();


import { getConfig, selectServer } from "./utils";
import { Session } from "../core";
import { UserConfig } from "./interface";
import { TaskSchedule } from "./task-schedule";
import * as tasks from "./tasks";

async function start() {
    //const config = getConfig();
    const config:UserConfig={
        key: "test4",
        name: "邹有竦",
        server: 2,
        account: {
            code: "apollozz1",
            pwd: "1982525"
        },
        tasks: [
            //new tasks.MapTask()
            //new tasks.MineTask()
            //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
            new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
        ]
    }
    
    const server = await selectServer(config);
    const session = new Session(server);
    //运行
    await new TaskSchedule(config.tasks, session, config).Run();
}

start();
