import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import {Promise} from "bluebird";
import { Msg } from "../../core/data";
import { appendFile } from "fs";
//import { exists } from "fs";

let players: player[]=[];
let msgs="";
const message = /^(message|m)\s([\S\s]*)$/;
const fuli = /听说武帝(\D+)闭关修炼似有所悟，你随之受益获得了(\d+)经验/;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '54.241.201.225',
  user: 'chris',
  password: '1982525',
  database: 'wsmud'
});
export class RecordTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    
    async start(session: Session, config: UserConfig) {
        let cancelled=false;
        //var self = this;
        //console.log(`start\n`);
        // connection.connect((err) => {
        //     if (err) throw err;
        //     console.log('Connected!');
        // });
        session.removeAllListeners('msg');
        session.on('msg', processMsg);
        //session.on('message', processMessage);
        //session.on('data', processData);
        // connection.query('SELECT * FROM ws_user', (err,rows) => {
        //     if(err) throw err;
          
        //     console.log('Data received from Db:\n');
        //     console.log(rows);
        // });
        var CronJob = require('cron').CronJob;
        new CronJob('00 00 * * * *', async function () {
        //new CronJob('00 24,30 15 * * *', async function () {        
            //await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
            //console.log(new Date()+"start record!");
            //await callback(self);
            record()
        }, null, true, 'America/Los_Angeles');
        
        while (true) {
            //console.log("check if end.. "+this.isCancellationRequested);   
            //console.log("check priority.. "+cancelled); 
            //console.log("players:"+JSON.stringify(players, null, 4) + `\n`);
            if (this.isCancellationRequested||cancelled) {
                session.removeAllListeners('msg');
                break;
            }
            await Promise.delay(5000 * 10 * 1);
            await session.sendAsync("look");

        }       
        await Promise.delay(1000);
        this.priority=-1;
        return;
        function processPlayers(value) {
            connection.query(`CALL updateUser('${value.user_id}','${value.user_name}')`, (err,rows) => {
                if(err){ 
                    Promise.promisify(appendFile)(`./core/rooms/error.json`, new Date() + JSON.stringify(err, null, 4) + `|${value.user_id}|${value.user_name}updateUser error\n`);
                    //throw err;
                }
              
            });
        }
        async function processMsg(data: Msg) {
            if(data.ch==='chat'&&data.name!=""&&data.uid!=null&&data.uid!=''&&data.name!='<him>婚庆主持</him>'&&data.name!='金古易'&&data.name!='张三丰'&&data.name != '岳不群'&&data.name != '灭绝'&&data.name != '逍遥子'
            &&data.name != '洪七公'&&data.name != '唐楠'){
                var player = { user_id: data.uid, user_name: data.name };
                var index;
                if(index=players.findIndex(i => i.user_id === data.uid)==-1){
                    players.push(player);
                }
                var matches;
                if ((matches = message.exec(data.content)) != null) {
                    if(matches[2]!=null&&matches[2]!=''){
                        msgs+=data.name+":"+matches[2]+'\n';
                    }
                }
            }else if(data.ch==='rumor'){
                var matches;
                if ((matches = fuli.exec(data.content)) != null) {
                    connection.query(`CALL saveExp('${matches[1]}','${matches[2]}')`, (err,rows) => {
                        if(err){ 
                            Promise.promisify(appendFile)(`./core/rooms/error.json`, new Date() + JSON.stringify(err, null, 4) + `|'${matches[1]}|'${matches[2]}|saveExp error\n`);
                            //throw err;
                        }
                      
                    });
                }
            }
        }
        // async function processMessage(msg: string) {
        //     console.log(`msg:` + msg + `\n`);
        // };
        async function record(){   
            //console.log("players:"+JSON.stringify(players, null, 4) + `\n`);   
            await players.forEach(processPlayers);             
            players=[];
            if(msgs!=''){
            connection.query(`CALL saveMessage('${msgs}')`, (err,rows) => {
                if(err){ 
                    Promise.promisify(appendFile)(`./core/rooms/error.json`, new Date() + JSON.stringify(err, null, 4) + `|${msgs}|save Message error\n`);
                    //throw err;
                }
              
            });
            msgs='';
            }
        }

    }


    
}
interface player {
    user_id: string;
    user_name: string;
}
