import { Promise } from "bluebird";

const LIMIT_CMD_COUNT = 60;
const LIMIT_CMD_INTERVAL = 8000;

/**
 * 控制命令发送速度。
 * 指令时间内发送命令次数超过限制，自动增加等待时间
 */
export class CommandSender {

    private count = 0;
    private total = 0;
    private refreshTime = new Date();

    constructor(private originSender: { sendAsync: (cmd: string) => Promise<void> }) {
    }


    async sendAsync(cmd: string) {
        this.count += 1;
        this.total += 1;
        if (this.count > LIMIT_CMD_COUNT) {
            const delay = this.refreshTime.getTime() + LIMIT_CMD_INTERVAL - new Date().getTime();
            if (delay > 0)
                await Promise.delay(delay);
            const now = new Date();
            this.count = 0;
            this.refreshTime = now;
            console.log(`${now.toLocaleTimeString()}: ${this.total} commands were sent.`);
        }
        await this.originSender.sendAsync(cmd);
    }
}