import { TaskSchedule } from "./task-schedule";
import { Session } from "../core";
import { UserConfig } from "./interface";

export class Task {
    /**
     * 优先级
     */
    private _priority: number


    public get priority(): number {
        return this._priority;
    }


    public set priority(v: number) {
        if (this._priority != v) {
            this._priority = v;
            if (this.taskSchedule)
                this.taskSchedule.checkPriority();
        }
    }

    isCancellationRequested: boolean;
    taskSchedule: TaskSchedule;

    /**
     * 开始执行任务
     */
    async start(session: Session, config: UserConfig): Promise<void> {
        throw new Error("不能调用Task基类的start方法。");
    }


}

