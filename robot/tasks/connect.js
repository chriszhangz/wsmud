"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../task");
const utils_1 = require("../utils");
const bluebird_1 = require("bluebird");
/**
 * 连线，重连任务
 */
class ConnectTask extends task_1.Task {
    constructor() {
        super();
        this.isKicked = false;
        this.priority = 1000;
    }
    async start(session, config) {
        await utils_1.login(session, config, this.isKicked);
        if (this.isKicked) {
            while (true) {
                await session.sendAsync(`look3 ${session.world.me.role.id}`);
                await bluebird_1.Promise.delay(1000 * 20);
                var offline = false;
                if (offline) {
                    break;
                }
            }
            this.isKicked = false;
        }
        this.priority = -1;
    }
}
exports.ConnectTask = ConnectTask;
//# sourceMappingURL=connect.js.map