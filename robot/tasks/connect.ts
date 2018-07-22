import { UserConfig } from '../interface';
import { Session } from '../../core';
import { Task } from "../task";
import { login } from "../utils";
import { Promise } from "bluebird";


/**
 * 连线，重连任务
 */
export class ConnectTask extends Task {

    isKicked = false;

    constructor() {
        super();
        this.priority = 1000;
    }

    async start(session: Session, config: UserConfig) {
        await login(session, config, this.isKicked);
        if (this.isKicked) {
            while (true) {
                await session.sendAsync(`look3 ${session.world.me.role.id}`)
                await Promise.delay(1000 * 20);
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
