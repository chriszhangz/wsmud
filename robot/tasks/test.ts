import { Task } from "../task";
import { Session } from "../../core";
import { UserConfig } from "../interface";
import { Promise } from "bluebird";
import { Data, Msg } from "../../core/data";
//import { exists } from "fs";
const ch = 'pty';
const jhstart = /襄阳战事正紧(\S+)</;
const qnjs = /^(qnjs|q)\s(\d+)\s(\d+)\s(\D+)$/;
const sxjs = /^(sxjs|s)\s(\d+)\s(\D+)$/;
const lxjs = /^(lxjs|l)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\D+)$/;
const dzjs = /^(dzjs|d)\s(\d+)\s(\d+)\s(\d+)$/;
const look = /^(look|l)\s(\D+)$/;
const check = /^(check|c)\s(\D+)$/;
const message = /^(message|m)\s([\S\s]*)$/;
const help = /^(help|h)$/;
const helpDetail = /^(help|h)\s(\D+)$/;
const top = /^(top|t)$/i;
const fuli = /听说武帝(\D+)闭关修炼似有所悟，你随之受益获得了(\d+)经验/;
//const combatStart = /想杀死你！/;
let jhmsg;
// let players: player[]=[];
let exps: exp[]=[];
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
        let cancelled = false;
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
            if (config.name == '邹有竦') {
                inCombat = 1;
                die = 1;
            }
            //console.log("players:"+JSON.stringify(players, null, 4) + `\n`);   
            //players.forEach(processPlayers); 
            if (this.isCancellationRequested || cancelled) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                break;
            }
            await Promise.delay(5000 * 10 * 1);
            await session.sendAsync("look");

        }
        console.log("end.. " + config.name);
        await Promise.delay(1000);
        this.priority = -1;
        return;
        // function processPlayers(value) {
        //     connection.query(`CALL updateUser('${value.user_id}','${value.user_name}')`, (err,rows) => {
        //         if(err) throw err;

        //     });
        // }
        async function processMsg(data: Msg) {
            if (data.ch === 'pty') {
                var matches;
                if ((matches = help.exec(data.content)) != null) {
                    await session.sendAsync(`${ch} 目前可用命令 b/boss c/check d/dzjs l/lxjs l/look m/message q/qnjs s/sxjs x/xy, help 加命令查询具体使用方法。`);
                }
                else if ((matches = message.exec(data.content)) != null) {
                    await session.sendAsync(`${ch} 留言已记录，谢谢这位大侠。`);
                }
                else if ((matches = helpDetail.exec(data.content)) != null) {
                    var rtmsg;
                    switch (matches[2]) {
                        case 'b':
                        case 'boss':
                            rtmsg = '💡b/boss：查询世界boss信息。';
                            break;
                        case 'c':
                        case 'check':
                            rtmsg = '💡c/check 角色名：查询该角色曾用名以及最后发言日期。由于记录数据时间较晚，有好心侠客想提供以前的曾用名请用m/message留言谢谢。';
                            break;
                        case 'd':
                        case 'dzjs':
                            rtmsg = '💡d/dzjs 每跳加内力 当前内力 目标内力：查询打坐所需时间。';
                            break;
                        case 'l':
                            rtmsg = '💡l/look 角色名：查询该角色当前状态。| l/lxjs 先天悟性 后天悟性 练习效率 当前等级 目标等级 技能颜色：查询练习所需潜能以及时间。';
                            break;
                        case 'look':
                            rtmsg = '💡l/look 角色名：查询该角色当前状态。';
                            break;
                        case 'lxjs':
                            rtmsg = '💡l/lxjs 先天悟性 后天悟性 练习效率 当前等级 目标等级 技能颜色：查询练习所需潜能以及时间。';
                            break;
                        case 'm':
                        case 'message':
                            rtmsg = '💡m/message 留言：如果有任何建议，意见欢迎留言，豆包会定时查看谢谢。';
                            break;
                        case 'q':
                        case 'qnjs':
                            rtmsg = '💡q/qnjs 当前等级 目标等级 技能颜色：查询练习所需潜能。';
                            break;
                        case 's':
                        case 'sxjs':
                            rtmsg = '💡s/sxjs 技能等级 境界：查询到达该境界技能等级上限所需经验。';
                            break;
                        case 'x':
                        case 'xy':
                            rtmsg = '💡x/xy：查询襄阳城相关信息。';
                            break;
                        default:
                            return;
                    }
                    await session.sendAsync(`${ch} ${rtmsg}`);
                }
                else if ((matches = dzjs.exec(data.content)) != null) {
                    var dazuo = timeText((parseInt(matches[4]) - parseInt(matches[3])) / parseInt(matches[2]) / 6);
                    await session.sendAsync(`${ch} ${data.name} 打坐完需要时间：${dazuo}`);

                }
                else if ((matches = qnjs.exec(data.content)) != null) {
                    var level;
                    switch (matches[4]) {
                        case '白':
                        case '白色':
                            level = 2.5;
                            break;
                        case '绿':
                        case '绿色':
                            level = 5;
                            break;
                        case '蓝':
                        case '蓝色':
                            level = 7.5;
                            break;
                        case '黄':
                        case '黄色':
                            level = 10;
                            break;
                        case '紫':
                        case '紫色':
                            level = 12.5;
                            break;
                        case '橙':
                        case '橙色':
                            level = 15;
                            break;
                        default:
                            return;
                    }
                    var qianneng = caculateQN(matches[2], matches[3], level);
                    await session.sendAsync(`pty ${data.name} 需要潜能：${qianneng}`);

                }
                else if ((matches = lxjs.exec(data.content)) != null) {
                    var level;
                    switch (matches[7]) {
                        case '白':
                        case '白色':
                            level = 2.5;
                            break;
                        case '绿':
                        case '绿色':
                            level = 5;
                            break;
                        case '蓝':
                        case '蓝色':
                            level = 7.5;
                            break;
                        case '黄':
                        case '黄色':
                            level = 10;
                            break;
                        case '紫':
                        case '紫色':
                            level = 12.5;
                            break;
                        case '橙':
                        case '橙色':
                            level = 15;
                            break;
                        default:
                            return;
                    }
                    var qianneng = caculateQN(matches[5], matches[6], level);
                    var lx = qianneng / (parseInt(matches[2]) + parseInt(matches[3])) / (100 / 100 + parseInt(matches[4]) / 100 - parseInt(matches[2]) / 100) / 12;
                    console.log('lx:' + lx);
                    var text = timeText(lx);
                    await session.sendAsync(`${ch} ${data.name} 练习需要时间：${text}，需要潜能：${qianneng}`);

                }
                else if ((matches = sxjs.exec(data.content)) != null) {
                    var level;
                    switch (matches[3]) {
                        case '武士':
                            level = 20;
                            break;
                        case '武师':
                            level = 30;
                            break;
                        case '宗师':
                            level = 40;
                            break;
                        case '武圣':
                            level = 50;
                            break;
                        case '武帝':
                            level = 60;
                            break;
                        default:
                            return;
                    }
                    var jingyan = caculateJY(matches[2], level);
                    await session.sendAsync(`pty ${matches[3]}${matches[2]}级技能上限，需要经验：${jingyan}`);
                }
                else if ((matches = check.exec(data.content)) != null) {
                    if (matches[2] != '') {
                        connection.query(`select a.user_name,a.user_lastchat from ws_user a where a.user_name = ? or a.user_name like ? or a.user_name like ?`, [matches[2], matches[2] + ',%', '%,' + matches[2]], (err, rows) => {
                            if (err) throw err;
                            if (rows.length == 0) {
                                //console.log('抱歉，暂无 ' + userName + ' 的数据记录');
                                session.sendAsync(`${ch} 抱歉，暂无 ${matches[2]} 的数据记录`);
                            } else {
                                let date = new Date();
                                date = rows[0].user_lastchat;
                                var foundMsg = '';
                                for (const row in rows) {
                                    if (matches[2] != rows[row].user_name) {
                                        foundMsg += matches[2] + '(' + rows[row].user_name + ') 最后一次发言日期:' + date.toISOString().split("T")[0] + '。 ';
                                    } else {
                                        foundMsg += matches[2] + ' 最后一次发言日期:' + date.toISOString().split("T")[0] + ' ';
                                    }
                                }
                                //console.log(foundMsg);
                                session.sendAsync(`${ch} ${foundMsg}`);
                            }
                        });
                    }
                }
                else if ((matches = look.exec(data.content)) != null) {
                    //var userName = matches[2];
                    if (matches[2] != '') {
                        connection.query(`select a.user_id from ws_user a where a.user_name = ? or a.user_name like ?`, [matches[2], '%,' + matches[2]], (err, rows) => {
                            if (err) throw err;
                            if (rows.length == 0) {
                                //console.log('抱歉，暂无 ' + matches[2] + ' 的数据记录');
                                connection.query(`select a.user_id from ws_user a where a.user_name like ? or a.user_name like ?`, [matches[2] + ',%', '%,' + matches[2] + ',%'], (err, rows) => {

                                    if (rows.length == 0) {
                                        session.sendAsync(`${ch} 抱歉，暂无 ${matches[2]} 的数据记录`);
                                    } else {
                                        session.sendAsync(`look3 ${rows[0].user_id}`);
                                    }
                                });
                            } else {
                                session.sendAsync(`look3 ${rows[0].user_id}`);
                            }
                        });

                    }
                }else if((matches = top.exec(data.content)) != null){
                    var expYesterday='';
                    var expNow='';
                    if(exps.length>=1){
                        expNow += exps[0].user_name+'('+exps[0].user_exp+') ';
                    }
                    if(exps.length>=2){
                        expNow += exps[1].user_name+'('+exps[1].user_exp+') ';
                    }
                    if(exps.length>=3){
                        expNow += exps[2].user_name+'('+exps[2].user_exp+') ';
                    }
                    if(expNow!=''){
                        await session.sendAsync(`${ch} 今日武帝出关经验排名：${expNow}`);
                    }else{
                        await session.sendAsync(`${ch} 今日武帝出关经验排名：暂无数据`);
                    }
                }
            }
            if(data.ch==='rumor'){
                var matches;
                if ((matches = fuli.exec(data.content)) != null) {
                    var tmp:exp={user_name:matches[1],user_exp:matches[2]};
                    exps.push(tmp);
                    exps.sort(function(a, b){return b.user_exp - a.user_exp});
                    console.log(JSON.stringify(exps, null, 4));
                }
            }
        }
        async function processMessage(msg: string) {
            if (msg.includes('看起来约')) {
                var status: string;
                if (msg.includes('他看起来约')) {
                    status = msg.split('他的武功')[0];
                } else {
                    status = msg.split('她的武功')[0];
                }
                status = status.replace(/<[A-Za-z]+>/g, '').replace(/<\/[A-Za-z]+>/g, '').replace('&lt;', '<').replace('&gt;', '>').replace(/(?:\r\n|\r|\n)/g, ' ');
                console.log('status:' + status);
                await session.sendAsync(`${ch} ${status}`);
            }else if(msg.includes('没有这个玩家。')){
                await session.sendAsync(`${ch} 该玩家已删号。。。`);
            }
            console.log(`msg:` + msg + `\n`);
            var matches;
            if ((matches = jhstart.exec(msg)) != null) {
            }
            if (msg.includes('想杀死你！')) {
                console.log('perform unarmed.zhong');
                await session.sendAsync("perform unarmed.zhong");
            }
        };
        async function processData(data: Data) {
            //console.log(new Date() + JSON.stringify(data, null, 4) + `\n`);
            if (data.type === 'dialog' && data.dialog === 'jh' && data.index != null && data.index == 8) {
                if (data.desc.includes("襄阳战事正紧，")) {
                    console.log('jhmsg:' + jhmsg);
                    var matches;
                    if ((matches = jhstart.exec(data.desc)) != null) {
                        jhmsg = matches[1];
                        console.log('jhmsg:' + jhmsg);
                    }
                }
            }
            if (data.type === 'sc' && data.mp != null && data.id == masterId) {
                //console.log(new Date()+JSON.stringify(data, null, 4) + `\n`);
                console.log(new Date() + `kill!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`);
                await session.sendAsync(`kill ${masterId}`);
            }
            if (data.type === 'die' && data.relive == null) {
                await session.sendAsync("relive");
                await wumiao(5000);
                await xiulian(1000);
                cancelled = true;
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
        function caculateQN(csdj: number, mbdj: number, djys: number): number {

            var qianneng = (mbdj * mbdj - csdj * csdj) * djys;
            //console.log('qianneng:' + qianneng);
            return qianneng;
        }
        function caculateJY(mbdj: number, jingjie: number): number {

            var jingyan = (mbdj * mbdj * mbdj) / jingjie;
            //console.log('jingyan:' + jingyan);
            return parseInt(jingyan.toString());
        }
        function timeText(t: number): string {
            if (t < 60) {
                var text = "";
                text = text + parseInt(t.toString()) + "分钟";
                return text;
            } else {
                var text = "";
                var d;
                var h = parseInt((t / 60).toString());
                var m = parseInt((t % 60).toString());

                if (h > 24) {
                    d = parseInt((h / 24).toString());
                    h = h % 24;
                    text = text + d + "天";
                }
                text = text + h + "小时" + m + "分钟";
                return text;
            }
        }
    }



}
// interface player {
//     user_id: string;
//     user_name: string;
// }
interface exp {
    user_name: string;
    user_exp: number;
}
