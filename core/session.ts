import { Server, Account } from "./interface";
import { WSClient } from "./ws-client";
import { Role, Data } from "./data";
import * as api from './ws-api';
import { World } from "./world";
import { Promise } from "bluebird";
import { CommandSender } from "./command-sender";
import { EventEmitter } from "events";

export class Session extends EventEmitter {

    private client: WSClient;
    private commander: CommandSender;

    /**
     * 保存当前连接的所有数据
     */
    public world: World;

    constructor(public server: Server) {
        super();
        this.client = new WSClient(server);
        this.commander = new CommandSender(this.client);
        this.client.on('close', () => this.emit('close'))
        this.client.on("data", (data: Data) => this.processData(data));
        this.client.on("message", (msg: string) => this.processMessage(msg));
    }


    private processMessage(msg: string) {
        this.emit("message", msg);
    }

    private processData(data: Data) {
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
                }else if(data.dialog === "pack"){
                    this.world.pack = data;
                }
                break;
            default:
                break;
        }
        this.emit("data", data);
        this.emit(data.type, data);
    }

    public async waitData<T extends Data>(type: string, timeout: number = 10000) {
        var promise = new Promise<T>((resolve, reject) => {
            this.once(type, (data: T) => resolve(data));
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
    public async connect(account: Account) {
        this.world = new World();
        const res = await api.Login(account);
        await this.client.connectAsync();
        await this.client.sendAsync(`${res.u} ${res.p}`);
    }

    /**
     * 登陆指定角色
     */
    public async login(role: Role) {
        console.log(`登陆角色... ${role.title} ${role.name} (${role.id})`);
        this.client.sendAsync('login ' + role.id);
    }

    /**
     * 发送命令给服务器
     */
    public sendAsync(cmd: string | string[]) {
        if (typeof cmd !== 'string') {
            cmd = cmd.join(";");
        }
        return this.commander.sendAsync(cmd);
    }


    public getStatus() {
        return this.client.sendAsync
    }
    /**
     * 获取服务器列表
     */
    static getServers() {
        return api.GetServers();
    }
}