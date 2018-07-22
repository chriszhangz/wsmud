"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const LIMIT_CMD_COUNT = 20;
const LIMIT_CMD_INTERVAL = 8000;
/**
 * 控制命令发送速度。
 * 指令时间内发送命令次数超过限制，自动增加等待时间
 */
class CommandSender {
    constructor(originSender) {
        this.originSender = originSender;
        this.count = 0;
        this.total = 0;
        this.refreshTime = new Date();
    }
    async sendAsync(cmd) {
        this.count += 1;
        this.total += 1;
        if (this.count > LIMIT_CMD_COUNT) {
            const delay = this.refreshTime.getTime() + LIMIT_CMD_INTERVAL - new Date().getTime();
            if (delay > 0)
                await bluebird_1.Promise.delay(delay);
            const now = new Date();
            this.count = 0;
            this.refreshTime = now;
            console.log(`${now.toLocaleTimeString()}: ${this.total} commands were sent.`);
        }
        await this.originSender.sendAsync(cmd);
    }
}
exports.CommandSender = CommandSender;
//# sourceMappingURL=command-sender.js.map