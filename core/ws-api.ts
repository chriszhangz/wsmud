import * as requestPromise from 'request-promise';
import config from './config';
import { Account, AccountToken, Server } from './interface';

var rp = requestPromise.defaults({
    baseUrl: config.api_base_url,
    json: true
});

export async function GetServers() {
    return await rp('Game/GetServer') as Server[];
}

export async function Login(account: Account) {
    const j = rp.jar();
    const token: AccountToken = await rp.post('UserAPI/Login', {
        form: account,
        jar: j
    });
    if (token.code === 1) {
        const cookies = j.getCookies(config.api_base_url);
        cookies.forEach(cookie => {
            if (cookie.key === 'u') {
                token.u = cookie.value;
            } else if (cookie.key === 'p') {
                token.p = cookie.value;
            }
        });
    }
    return token;
}