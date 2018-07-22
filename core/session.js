"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_client_1 = require("./ws-client");
const api = require("./ws-api");
const world_1 = require("./world");
const bluebird_1 = require("bluebird");
const command_sender_1 = require("./command-sender");
const events_1 = require("events");
class Session extends events_1.EventEmitter {
    constructor(server) {
        super();
        this.server = server;
        this.client = new ws_client_1.WSClient(server);
        this.commander = new command_sender_1.CommandSender(this.client);
        this.client.on('close', () => this.emit('close'));
        this.client.on("data", (data) => this.processData(data));
        this.client.on("message", (msg) => this.processMessage(msg));
    }
    processMessage(msg) {
        this.emit("message", msg);
    }
    processData(data) {
        switch (data.type) {
            case "room":
                this.world.room = data;
                break;
            case "exits":
                this.world.exits = data;
                break;
            case "items":
                this.world.items = data.items;
                break;
            case "roles":
                this.world.roles = data.roles;
                break;
            case "dialog":
                if (data.dialog === "tasks") {
                    this.world.tasks = data.items;
                }
                break;
            default:
                break;
        }
        this.emit("data", data);
        this.emit(data.type, data);
    }
    async waitData(type, timeout = 10000) {
        var promise = new bluebird_1.Promise((resolve, reject) => {
            this.once(type, (data) => resolve(data));
        });
        if (timeout) {
            promise = promise.timeout(timeout, `wait data ${type} timeout`);
        }
        return promise;
    }
    /**
     * 调用API，根据用户名密码获取Token
     * 发送Token给当前服务器，并返回角色列表
     */
    async connect(account) {
        this.world = new world_1.World();
        const res = await api.Login(account);
        await this.client.connectAsync();
        await this.client.sendAsync(`${res.u} ${res.p}`);
    }
    /**
     * 登陆指定角色
     */
    async login(role) {
        console.log(`登陆角色... ${role.title} ${role.name} (${role.id})`);
        this.client.sendAsync('login ' + role.id);
    }
    /**
     * 发送命令给服务器
     */
    sendAsync(cmd) {
        if (typeof cmd !== 'string') {
            cmd = cmd.join(";");
        }
        return this.commander.sendAsync(cmd);
    }
    getStatus() {
        return this.client.sendAsync;
    }
    /**
     * 获取服务器列表
     */
    static getServers() {
        return api.GetServers();
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map