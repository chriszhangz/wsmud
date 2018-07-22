"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const tasks_1 = require("./tasks");
class TaskSchedule {
    constructor(tasks, session, config) {
        this.tasks = tasks;
        this.session = session;
        this.config = config;
        this.connectTask = new tasks_1.ConnectTask();
        tasks.push(this.connectTask);
        tasks.forEach(task => task.taskSchedule = this);
        session.on('close', () => this.connectTask.priority = 1000);
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
            }
            catch (error) {
                if (error instanceof core_1.ConnectionError) {
                    this.connectTask.priority = 1000;
                }
                else {
                    console.log(`任务中断，当前任务：${typeof (this.currentTask)}`);
                    console.log(error);
                    break;
                }
            }
        }
    }
    findHighestPriorityTask() {
        let tempTask = null;
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
exports.TaskSchedule = TaskSchedule;
//# sourceMappingURL=task-schedule.js.map