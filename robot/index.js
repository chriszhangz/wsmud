"use strict";
// import { test } from "./test";
// test();
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const core_1 = require("../core");
const task_schedule_1 = require("./task-schedule");
async function start() {
    const config = utils_1.getConfig();
    const server = await utils_1.selectServer(config);
    const session = new core_1.Session(server);
    //运行
    await new task_schedule_1.TaskSchedule(config.tasks, session, config).Run();
}
start();
//# sourceMappingURL=index.js.map