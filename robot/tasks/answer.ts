import { UserConfig } from '../interface';
import { Session } from '../../core';
import { Task } from "../task";

export class AnswerTask extends Task {

    async  start(session: Session, config: UserConfig) {
        throw new Error("Method not implemented.");
    }
}