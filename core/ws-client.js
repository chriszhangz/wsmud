"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const events_1 = require("events");
const bluebird_1 = require("bluebird");
class ConnectionError extends Error {
    constructor() {
        super();
    }
}
exports.ConnectionError = ConnectionError;
class WSClient extends events_1.EventEmitter {
    constructor(server) {
        super();
        this.server = server;
    }
    connectAsync() {
        return new bluebird_1.Promise((resolve, reject) => {
            this.close();
            this.ws = new WebSocket(`ws://${this.server.IP}:${this.server.Port}`, { origin: 'game.wsmud.com' });
            this.ws.onclose = e => this.emit('close');
            this.ws.onopen = e => {
                e.target.onmessage = msg => {
                    if (!msg || !msg.data || typeof msg.data !== 'string') {
                        return;
                    }
                    var data = msg.data;
                    if (data[0] === '{' || data[0] === '[') {
                        this.emit('data', eval(`(${data})`));
                    }
                    else {
                        this.emit('message', data);
                    }
                };
                e.target.onerror = evt => this.emit('error', evt);
                resolve();
            };
            this.ws.onerror = e => reject(e);
        });
    }
    close() {
        if (this.ws) {
            this.ws.removeAllListeners();
            this.ws.close();
        }
    }
    async sendAsync(text) {
        if (this.ws == null || this.ws.readyState !== WebSocket.OPEN) {
            throw new ConnectionError();
        }
        this.ws.send(text);
    }
}
exports.WSClient = WSClient;
//# sourceMappingURL=ws-client.js.map