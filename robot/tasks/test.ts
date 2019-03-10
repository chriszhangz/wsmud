import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import {Promise} from "bluebird";
import { Data,Msg } from "../../core/data";
//import { exists } from "fs";

const jhstart = /襄阳战事正紧(\S+)</;
//const combatStart = /想杀死你！/;
let jhmsg;
// let players: player[]=[];
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '54.241.201.225',
  user: 'chris',
  password: '1982525',
  database: 'wsmud'
});
let inCombat = 0;

export class TestTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    
    async start(session: Session, config: UserConfig) {
        let masterId;
        let cancelled=false;
        let die = 0;
        //var self = this;
        console.log(`start\n`);
        session.on('msg', processMsg);
        session.on('message', processMessage);
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
          });
        session.on('data', processData);
        // connection.query('SELECT * FROM ws_user', (err,rows) => {
        //     if(err) throw err;
          
        //     console.log('Data received from Db:\n');
        //     console.log(rows);
        // });
        //const employee = { user_id: 'ucm427b2a93', user_name: '天照命' };
        // connection.query('INSERT INTO ws_user SET ?', employee, (err, res) => {
        //     if(err) throw err;
          
        //     console.log('Last insert ID:', res.insertId);
        // });          
        await Promise.delay(2000);
        await session.sendAsync("stopstate");
        //let taskPath = "jh fam 1 start;go west;go northup;go north;go west;go northup;go northup;go northup;go north;go north;go north;go north;go north;go north";
        //  let taskPath = "jh fam 2 start;go north;go west";
        // let taskPaths: string[] = taskPath.split(";");
        //                 for (let i = 0; i < taskPaths.length; i++) {
        //                     //console.log('Execute:'+cmdss[i].content);
        //                     await session.sendAsync(taskPaths[i]);
        //                     //await Promise.delay(100);
        //                 }
        //await session.sendAsync("jh fam 0 start");
        //await session.sendAsync("go north");
        //console.log("mastttter:"+JSON.stringify(session.world.items, null, 4) + `\n`);
        // await session.sendAsync("cr yz/lw/shangu");
        // await session.sendAsync("go west");  
            //await Promise.delay(5000);
            //console.log("mastttter2:"+JSON.stringify(session.world.items, null, 4) + `\n`);

        // let master = session.world.items.find(i => i && i.name.includes('张三丰'));
        // if (master) {
        // masterId=master.id;
        // //console.log(JSON.stringify(master, null, 4) + `\n`);
        // }else{
        //     console.log(`can't find master \n`);
        // }
        var CronJob = require('cron').CronJob;
        new CronJob('00 30 01 * * *', async function () {
        //new CronJob('00 24,30 15 * * *', async function () {        
            //await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + `任务start!!!!!!!!!!!!!!!!! \n`);
            console.log("start !");
            //await callback(self);
        }, null, true, 'Asia/Shanghai');        
        await Promise.delay(6000);
        //session.sendAsync(`look3 jx3227ed880`);
        //await session.sendAsync("jh fam 8");
        while (true) {
            //console.log("check if end.. "+this.isCancellationRequested);   
            //console.log(config.name+" check inCombat.. "+inCombat); 
            //console.log(config.name+" check die.. "+die);
            if(config.name=='邹有竦'){
                inCombat=1;
                die=1;
            } 
            //console.log("players:"+JSON.stringify(players, null, 4) + `\n`);   
            //players.forEach(processPlayers); 
            if (this.isCancellationRequested||cancelled) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                break;
            }
            await Promise.delay(5000 * 10 * 1);
            await session.sendAsync("look");

        }
        console.log("end.. "+config.name);          
        await Promise.delay(1000);
        this.priority=-1;
        return;
        // function processPlayers(value) {
        //     connection.query(`CALL updateUser('${value.user_id}','${value.user_name}')`, (err,rows) => {
        //         if(err) throw err;
              
        //     });
        // }
        async function processMsg(data: Msg) {
            if(data.ch==='pty'&&(data.content.startsWith('c ')||data.content.startsWith('check '))){
                var userName='';
                userName = data.content.replace('check ','').replace('c ','');
                
                if(userName != ''){
                connection.query(`select a.user_name,a.user_lastchat from ws_user a where a.user_name = ? or a.user_name like ? or a.user_name like ?`, [userName,userName+',%','%,'+userName], (err, rows) => {
                        if(err) throw err;
                        if(rows.length==0){
                            console.log('抱歉，暂无 '+userName+' 的数据记录');
                            session.sendAsync(`pty 抱歉，暂无 ${userName} 的数据记录`);
                        }else{
                            let date = new Date();
                            date=rows[0].user_lastchat;
                            var foundMsg='';
                            for(const row in rows){
                                if(userName!=rows[row].user_name){
                                    foundMsg+=userName+'('+rows[row].user_name+') 最后一次发言日期:'+date.toISOString().split("T")[0]+'。 ';
                                }else{
                                    foundMsg+=userName+' 最后一次发言日期:'+date.toISOString().split("T")[0]+' ';
                                }
                            }
                            console.log(foundMsg);
                            session.sendAsync(`pty ${foundMsg}`);
                        }
                    }); 
                
                }else{
                    console.log("格式错误，请用c或check 加空格 加人物名称来查询改名历史。")
                }
            }
            if(data.ch==='pty'&&(data.content.startsWith('l ')||data.content.startsWith('look '))){
                var userName='';
                userName = data.content.replace('look ','').replace('l ','');
                if(userName != ''){
                connection.query(`select a.user_id from ws_user a where a.user_name = ? or a.user_name like ? or a.user_name like ?`, [userName,userName+',%','%,'+userName], (err, rows) => {
                        if(err) throw err;
                        if(rows.length==0){
                            console.log('抱歉，暂无 '+userName+' 的数据记录');
                            session.sendAsync(`pty 抱歉，暂无 ${userName} 的数据记录`);
                        }else{
                            session.sendAsync(`look3 ${rows[0].user_id}`);
                        }
                    }); 
                
                }else{
                    console.log("格式错误，请用l或look 加空格 加人物名称来查询玩家当前状态。")
                }
            }
        }
        async function processMessage(msg: string) {
            if(msg.includes('看起来约')){
                var status:string;
                if(msg.includes('他看起来约')){
                    status=msg.split('他装备着')[0];
                }else{
                    status=msg.split('她装备着')[0];
                }
                status=status.replace(/<[A-Za-z]+>/g,'').replace(/<\/[A-Za-z]+>/g,'').replace('&lt;','<').replace('&gt;','>').replace(/(?:\r\n|\r|\n)/g, ' ');
                console.log('status:'+status);
                await session.sendAsync(`pty ${status}`);
            }
            console.log(`msg:` + msg + `\n`);
            var matches;
            if ((matches = jhstart.exec(msg)) != null){
            }
            if (msg.includes('想杀死你！')) {
                console.log('perform unarmed.zhong');
                await session.sendAsync("perform unarmed.zhong");
            }
        };
        async function processData(data: Data) {
            console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            if ( data.type === 'dialog'&&data.dialog==='jh'&&data.index!=null&&data.index==8){
                if(data.desc.includes("襄阳战事正紧，")){
                    console.log('jhmsg:'+jhmsg);
                    var matches;
                    if((matches = jhstart.exec(data.desc)) != null){
                        jhmsg = matches[1];
                        console.log('jhmsg:'+jhmsg);
                    }
                }
            }
            if (data.type === 'sc' && data.mp != null && data.id == masterId) {
                //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
            console.log(new Date()+`kill!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`);
                await session.sendAsync(`kill ${masterId}`);
            }
            if(data.type==='die'&&data.relive==null){
                await session.sendAsync("relive");
                await wumiao(5000);
                await xiulian(1000);
                cancelled=true;
                //this.isCancellationRequested=true;
            }
            // if(data.type==='items'){
            //     const master = data.items.find(i => i && i.name.includes('守门人'));
            //     if (master) {
            //         // while (master.hp == master.max_hp) {
            //         //     await Promise.promisify(appendFile)(`./core/rooms/test1.json`, new Date() + master.name + `max hap has to wait\n`);
            //         //     await Promise.delay(3000);
            //         // }
            //         // await session.sendAsync(`kill ${master.id}`);
            //         masterId = master.id;
            //         console.log(new Date() + `Find Master:`+JSON.stringify(master, null, 4)+`\n`);
            //         await session.sendAsync(`kill ${masterId}`);
            //     }
            // }
        };
        async function wumiao(time: number) {
            await session.sendAsync("stopstate");
            await session.sendAsync("jh fam 0 start");
            await session.sendAsync("go north");
            await session.sendAsync("go north");
            await session.sendAsync("go west");
            await Promise.delay(time);
        }
        async function xiulian(time: number) {
            await session.sendAsync("stopstate");
            await session.sendAsync("jh fam 0 start");
            await Promise.delay(500);
            await session.sendAsync("go west");
            await Promise.delay(500);
            await session.sendAsync("go west");
            await Promise.delay(500);
            await session.sendAsync("go north");
            await Promise.delay(500);
            await session.sendAsync("go enter");
            await Promise.delay(500);
            await session.sendAsync("go west");
            await Promise.delay(500);
            await session.sendAsync("xiulian");
            await Promise.delay(time);
        }

    }


    
}
// interface player {
//     user_id: string;
//     user_name: string;
// }
