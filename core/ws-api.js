"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise");
const config_1 = require("./config");
var rp = requestPromise.defaults({
    baseUrl: config_1.default.api_base_url,
    json: true
});
async function GetServers() {
    return await rp('Game/GetServer');
}
exports.GetServers = GetServers;
async function Login(account) {
    const j = rp.jar();
    const token = await rp.post('UserAPI/Login', {
        form: account,
        jar: j
    });
    if (token.code === 1) {
        const cookies = j.getCookies(config_1.default.api_base_url);
        cookies.forEach(cookie => {
            if (cookie.key === 'u') {
                token.u = cookie.value;
            }
            else if (cookie.key === 'p') {
                token.p = cookie.value;
            }
        });
    }
    return token;
}
exports.Login = Login;
//# sourceMappingURL=ws-api.js.map