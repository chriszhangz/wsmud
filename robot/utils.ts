import { Session, Account } from "../core";
import { UserConfig } from "./interface";
import { Roles } from "../core/data";
import { users } from "./users";
import * as minimist from 'minimist'

export async function login(session: Session, config: UserConfig, daemon = false) {
    var account: Account;
    var name: string;
    if (daemon) {
        name = config.daemonName || config.name + '守护';
        account = config.daemonAccount || config.account;
    } else {
        account = config.account;
        name = config.name;
    }
    await session.connect(account);
    const data = await session.waitData<Roles>("roles");
    const role = data.roles.find(r => r.name == name);
    if (role == null) {
        throw `登陆失败，未找到角色: ${config.name}。此账号一共${data.roles.length}个角色：${JSON.stringify(data.roles)}`;
    }
    await session.login(role);
}


export function getConfig() {
    var argv = minimist(process.argv.slice(2));
    var user_id = argv['u'] || argv['user'];
    var user_config = users.find(u => u.key == user_id);
    if (user_config == null) {
        throw `user ${user_id} was not found.`;
    }
    return user_config;
}

export async function selectServer(config: UserConfig) {
    var servers = await Session.getServers();
    var server = servers.find(s => s.ID == config.server);
    if (server == null) {
        throw `server id ${config.server} for user ${config.key} was not found.`;
    }
    return server;
}