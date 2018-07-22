import * as WebSocket from 'ws';
import { Server } from './interface';
import { EventEmitter } from 'events';
import { Promise } from 'bluebird';

export class ConnectionError extends Error {
    constructor() {
        super();
    }
}

export class WSClient extends EventEmitter {

    ws: WebSocket;
    index: number;
    x: TypeError

    constructor(public server: Server) {
        super();
    }

    connectAsync() {
        return new Promise((resolve, reject) => {
            this.close();
            this.ws = new WebSocket(`ws://${this.server.IP}:${this.server.Port}`, { origin: 'game.wsmud.com' });
            this.ws.onclose = e =>
                this.emit('close');
            this.ws.onopen = e => {
                e.target.onmessage = msg => {
                    if (!msg || !msg.data || typeof msg.data !== 'string') {
                        return;
                    }
                    var data = msg.data;
                    if (data[0] === '{' || data[0] === '[') {
                        this.emit('data', eval(`(${data})`));
                    } else {
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

    async sendAsync(text: string) {
        if (this.ws == null || this.ws.readyState !== WebSocket.OPEN) {
            throw new ConnectionError();
        }
        this.ws.send(text);
    }
}