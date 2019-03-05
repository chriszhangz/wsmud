

// import { test } from "./test";
// test();


import { getConfig, selectServer } from "./utils";
import { Session } from "../core";
import { TaskSchedule } from "./task-schedule";

async function start() {
    const config = getConfig();
    const server = await selectServer(config);
    const session = new Session(server);
    //运行
    await new TaskSchedule(config.tasks, session, config).Run();
    session.close();
}

start();
