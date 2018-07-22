"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const task_1 = require("../task");
const r = /<hig>你获得了(\d+)点/;
class BadiTask extends task_1.Task {
    constructor() {
        super();
        this.priority = 100;
    }
    async start(session, config) {
        let newbook = false; //是否有新的book
        let current = 0; //当前数值
        let lastbook = new Date();
        let lastchat = new Date();
        const ch = (config.key.startsWith("badi") ? "chat" : "tm");
        /**
         * 获取指南持续时间的中文描述
         */
        function GetZNTimes() {
            var time = new Date().getTime() - lastbook.getTime();
            time = time / 1000;
            var mins = Math.floor(time / 60);
            var secs = Math.floor(time % 60);
            return `${mins}分${secs}秒`;
        }
        /**
         * 处理普通文本消息，这个函数只处理经验获得消息
         * @param msg 普通文本消息
         */
        async function processMessage(msg) {
            var matches;
            if ((matches = r.exec(msg)) != null) {
                var point = parseInt(matches[1]) - (new Date().getHours() > 12 ? 15 : 40);
                var extra = Math.floor(point / 10) * 10;
                if (extra > 10000)
                    return; //跨服击杀
                if ((current != extra) || newbook) {
                    newbook = false;
                    if (current == extra) {
                        await session.sendAsync(`${ch} +${current}  (已持续${GetZNTimes()})`);
                    }
                    else {
                        lastbook = new Date();
                        current = extra;
                        if (current == 0) {
                            await session.sendAsync(`${ch} 挖矿指南结束！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！`);
                        }
                        else {
                            await session.sendAsync(`${ch} +${current}`);
                        }
                    }
                }
            }
        }
        ;
        /**
         * 处理聊天消息
         * @param data
         */
        async function processMsg(data) {
            if (data.ch === "sys") {
                if (data.content.indexOf('捡到一本挖矿指南') > 0) {
                    newbook = true;
                }
            }
            else if (data.ch === ch) {
                if (new Date().getTime() - lastchat.getTime() > 1000 * 8) {
                    var content = data.content.trim().toLowerCase();
                    if (content === "wkzn" || content == "k") {
                        await session.sendAsync(`${ch} 目前的挖矿指南是+${current}已持续${GetZNTimes()}`);
                        lastchat = new Date();
                    }
                }
            }
        }
        session.on('message', processMessage);
        session.on('msg', processMsg);
        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('msg', processMsg);
                break;
            }
            await bluebird_1.Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }
}
exports.BadiTask = BadiTask;
//# sourceMappingURL=badi.js.map