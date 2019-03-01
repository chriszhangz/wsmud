import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import {Promise} from "bluebird";
import { Msg } from "../../core/data";
//import { exists } from "fs";

let players: player[]=[];
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '54.241.201.225',
  user: 'chris',
  password: '1982525',
  database: 'wsmud'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
export class RecordTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    
    async start(session: Session, config: UserConfig) {
        let cancelled=false;
        //var self = this;
        console.log(`start\n`);
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
            console.log(new Date()+"start record!");
            //await callback(self);
            record()
        }, null, true, 'America/Los_Angeles');
        
        while (true) {
            //console.log("check if end.. "+this.isCancellationRequested);   
            //console.log("check priority.. "+cancelled); 
            //console.log("players:"+JSON.stringify(players, null, 4) + `\n`);
            if (this.isCancellationRequested||cancelled) {
                session.removeListener('msg', processMsg);
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
                if(err) throw err;
              
            });
        }
        async function processMsg(data: Msg) {
            if(data.ch==='chat'&&data.name!=""&&data.uid!=null&&data.uid!=''){
                var player = { user_id: data.uid, user_name: data.name };
                var index;
                if(index=players.findIndex(i => i.user_id === data.uid)==-1){
                    players.push(player);
                }
                
            }
        }
        // async function processMessage(msg: string) {
        //     console.log(`msg:` + msg + `\n`);
        // };
        async function record(){   
            console.log("players:"+JSON.stringify(players, null, 4) + `\n`);   
            await players.forEach(processPlayers);             
            players=[];
        }

    }


    
}
interface player {
    user_id: string;
    user_name: string;
}
