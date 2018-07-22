"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    get priority() {
        return this._priority;
    }
    set priority(v) {
        if (this._priority != v) {
            this._priority = v;
            if (this.taskSchedule)
                this.taskSchedule.checkPriority();
        }
    }
    /**
     * 开始执行任务
     */
    async start(session, config) {
        throw new Error("不能调用Task基类的start方法。");
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map