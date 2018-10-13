import { Task } from "./task";
import { UserConfig } from "./interface";
import { Session, ConnectionError } from "../core";
import { ConnectTask } from "./tasks";
import {Promise} from "bluebird";

export class TaskSchedule {

    currentTask: Task | null;
    connectTask: ConnectTask = new ConnectTask();


    constructor(
        public readonly tasks: Task[],
        public readonly session: Session,
        public readonly config: UserConfig
    ) {
        tasks.push(this.connectTask);
        tasks.forEach(task => task.taskSchedule = this);
        session.on('close', () =>
            this.connectTask.priority = 1000);
    }


    async Run() {
        while (true) {
            this.currentTask = this.findHighestPriorityTask();
            if (this.currentTask === null) {
                console.log("没有可执行任务");
                return;
            }
            try {
                await this.currentTask.start(this.session, this.config);
            } catch (error) {
                if (error instanceof ConnectionError) {
                    console.log(`wait 5 mis to reconnect`);
                    await Promise.delay(300000);
                    console.log(`reconnect..`);
                    this.connectTask.priority = 1000;
                } else {
                    console.log(`任务中断，当前任务：${typeof (this.currentTask)}`);
                    console.log(error);
                    break;
                }
            }
        }
    }

    private findHighestPriorityTask(): Task | null {
        let tempTask: Task | null = null;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task && (tempTask === null || task.priority > tempTask.priority))
                tempTask = task;
        }
        if (tempTask && tempTask.priority < 0) {
            tempTask = null;
        }
        return tempTask;
    }

    checkPriority() {
        //所有任务必须自己退出。这里只是将执行中的任务标记为需要退出
        var hptask = this.findHighestPriorityTask();
        if (this.currentTask && this.currentTask != hptask) {
            this.currentTask.isCancellationRequested = true;
        }
    }

}