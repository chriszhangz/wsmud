"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const users_1 = require("./users");
const minimist = require("minimist");
async function login(session, config, daemon = false) {
    var account;
    var name;
    if (daemon) {
        name = config.daemonName || config.name + '守护';
        account = config.daemonAccount || config.account;
    }
    else {
        account = config.account;
        name = config.name;
    }
    await session.connect(account);
    const data = await session.waitData("roles");
    const role = data.roles.find(r => r.name == name);
    if (role == null) {
        throw `登陆失败，未找到角色: ${config.name}。此账号一共${data.roles.length}个角色：${JSON.stringify(data.roles)}`;
    }
    await session.login(role);
}
exports.login = login;
function getConfig() {
    var argv = minimist(process.argv.slice(2));
    var user_id = argv['u'] || argv['user'];
    var user_config = users_1.users.find(u => u.key == user_id);
    if (user_config == null) {
        throw `user ${user_id} was not found.`;
    }
    return user_config;
}
exports.getConfig = getConfig;
async function selectServer(config) {
    var servers = await core_1.Session.getServers();
    var server = servers.find(s => s.ID == config.server);
    if (server == null) {
        throw `server id ${config.server} for user ${config.key} was not found.`;
    }
    return server;
}
exports.selectServer = selectServer;
//# sourceMappingURL=utils.js.map