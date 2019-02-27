import { Session } from '../../core';
import { Data } from "../../core/data";
import { Msg } from '../../core/data';
import { Promise } from 'bluebird';
import { UserConfig } from '../interface';
import { Task } from "../task";
// import * as fs from "fs";

const addJob = /你催动内力专心致志地控制着火候，丹炉里的材料慢慢炼/;
const addJob2 = /丹炉里火力渐盛，是时候开始炼制了/;
const startJob = /你把炼制成的丹药从丹炉里拿出来，就化为一堆粉末，看来是研制失败了/;
const startJob2 = /你长时间未添加药材，炼制失败了/;
const getJob = /丹炉里的丹药渐渐凝聚，看上去快要成型了/;
const getJob2 = /直觉告诉你应该收丹/;
const goodJob = /恭喜你/;
// const tip1 = /应该放些(\D+)药材/;
// const tip2 = /应该放些(\D+)药引/;
// const tip3 = /应该放些药材/;
// const tip4 = /应该放些药引/;
// const tip5 = /应该放些(\D+)>。/;

// const quest = /为师最近突然想尝一下<wht>包子/;
// const quest2 = /我要的是<wht>包子/;
interface yao {
    name: string;
    id: string;
};
//let shimen = 0;
let times = 0;
// let FailedTimes = 0;
// let fangyao = 0;
//let msgs = [""];
//const pty = "pty";
export class AiTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    firstChiefTime: number;

    basePriority: number;
    // private yaocai:yao [] = [{name:"熟地黄",id:"90lu26853f7"},{name:"茯苓",id:"rl4w2683bf8"},{name:"沉香",id:"5ize29b4dc6"},{name:"冬虫夏草",id:"jif929b55ca"},{name:"络石藤",id:"4fw227c0f7f"},{name:"九香虫",id:"wnv327c0768"}];
    // //private yaocai2:yao [] = [{name:"柴胡",id:"geav27e362b"},{name:"金银花",id:"z1792c18812"},{name:"石楠叶",id:"umrm26cf3c6"},{name:"熟地黄",id:"gs7c26a0315"},{name:"茯苓",id:"phkl26cf4fa"},{name:"沉香",id:"oors26cf940"}];
    // private yaocaibai:yao [] = [{name:"芦荟",id:"lbxl27e355e"},{name:"当归",id:"26vb27e34c1"},{name:"山楂叶",id:"pxbu26cf5ae"}];
    // //private yaocailv:yao [] = [{name:"柴胡",id:"geav27e362b"},{name:"金银花",id:"z1792c18812"},{name:"石楠叶",id:"umrm26cf3c6"}];
    // //private yaocailan:yao [] = [{name:"熟地黄",id:"gs7c26a0315"},{name:"茯苓",id:"phkl26cf4fa"},{name:"沉香",id:"oors26cf940"}];
    // private yaoyin:yao [] = [{name:"太湖银鱼",id:"pc5f2d0c69d"},{name:"黄金鳉",id:"vxip2d06c16"},{name:"黄颡鱼",id:"zora2d054c2"},{name:"反天刀",id:"59jh2dec3e6"},{name:"虹鳟",id:"0olo2d0a23e"},{name:"孔雀鱼",id:"6ofz2ded83a"}];
    // //private yaoyin2:yao [] = [{name:"鲮鱼",id:"p8oo26acc16"},{name:"鲂鱼",id:"33mg2722c52"},{name:"鳊鱼",id:"iocs26acae1"},{name:"太湖银鱼",id:"67to27e39aa"},{name:"黄金鳉",id:"et4j1fa02c6"},{name:"黄颡鱼",id:"x14s1fa0c29"}];
    // private yaoyinbai:yao [] = [{name:"鲤鱼",id:"s51j26ac608"},{name:"草鱼",id:"vuj126ac5b5"},{name:"鲢鱼",id:"a7e527e3582"}];
    //private yaoyinlv:yao [] = [{name:"鲮鱼",id:"p8oo26acc16"},{name:"鲂鱼",id:"33mg2722c52"},{name:"鳊鱼",id:"iocs26acae1"}];
    //private yaoyinlan:yao [] = [{name:"太湖银鱼",id:"67to27e39aa"},{name:"黄金鳉",id:"et4j1fa02c6"},{name:"黄颡鱼",id:"x14s1fa0c29"}];
    // private peifang:yao [] = [{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""}];
    private yaofang:yao [][] = [[{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""}],
    [{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""}]];
    async  start(session: Session, config: UserConfig) {
        // var self = this;
        // let yaocai = this.yaocai;
        // let yaocaibai = this.yaocaibai;
        // //let yaocailv = this.yaocailv;
        // //let yaocailan = this.yaocailan;
        // let yaoyin = this.yaoyin;
        // let yaoyinbai = this.yaoyinbai;
        //let yaoyinlv = this.yaoyinlv;
        //let yaoyinlan = this.yaoyinlan;
        // let peifang = this.peifang;
        //let yaocai2 = this.yaocai2;
        //let yaoyin2 = this.yaoyin2;
        let yaofang = this.yaofang;
        let index = 0;
        async function callback() {
            // while(shimen==0){
            //     await Promise.delay(3050);
            //     await session.sendAsync("lianyao2");
            //     await Promise.delay(10050);
            //     await session.sendAsync("lianyao2 add yao");
            //     await session.sendAsync("lianyao2 add 26vb27e34c1");
            //     await Promise.delay(9050);
            //     await session.sendAsync("lianyao2 add yao");
            //     await session.sendAsync("lianyao2 add 26vb27e34c1");
            //     await Promise.delay(9050);
            //     await session.sendAsync("lianyao2 add yao");
            //     await session.sendAsync("lianyao2 add 26vb27e34c1");
            //     await Promise.delay(9050);
            //     await session.sendAsync("lianyao2 add yao");
            //     await session.sendAsync("lianyao2 add 26vb27e34c1");
            //     await Promise.delay(9050);
            //     await session.sendAsync("lianyao2 add yao");
            //     await session.sendAsync("lianyao2 add 26vb27e34c1");
            //     await Promise.delay(8050);
            //     await session.sendAsync("lianyao2 stop");
            // }
            await session.sendAsync("lianyao2 start 3");
   
        }
        async function processMessage(msg: string) {
            console.log(msg);
            //fs.appendFile("peifang.txt",msg+"\r\n",function(){});
            var matches;
            if ((matches = addJob2.exec(msg)) != null) {
                console.log("++++Peifang="+yaofang[index][0].name+"|"+yaofang[index][1].name+"|"+yaofang[index][2].name+"|"+yaofang[index][3].name+"|"+yaofang[index][4].name+"|"+yaofang[index][5].name+"|"+yaofang[index][6].name);
                times=0;
            }
            //console.log("times="+times);
            if (((matches = addJob.exec(msg)) != null||(matches = addJob2.exec(msg)) != null||(matches = getJob.exec(msg)) != null)&&yaofang[index][times]!=null&&yaofang[index][times].name!=null&&yaofang[index][times].name!='') {
                await session.sendAsync("lianyao2 add "+yaofang[index][times].id);                
                times++;
                return;
            }else if ((matches = goodJob.exec(msg)) != null) {
                index++;
                await session.sendAsync("lianyao2 start 3");
                return;
            }else if ((matches = startJob.exec(msg)) != null||(matches = startJob2.exec(msg)) != null) {
                
                await session.sendAsync("lianyao2 start 3");
                return;
            }else if ((matches = getJob2.exec(msg)) != null) {
                await session.sendAsync("lianyao2 stop");
                return;
            }else if ((matches = getJob.exec(msg)) != null) {
                if(times==7){
                    await session.sendAsync("lianyao2 stop");
                }else{
                    await session.sendAsync("lianyao2 add "+yaofang[index][times].id);
                    times++;
                }
                return;
            }
            
        };
        // async function processMessage2(msg: string) {
        //     console.log(msg);
        //     //fs.appendFile("peifang.txt",msg+"\r\n",function(){});
        //     var matches;
        //     if ((matches = addJob2.exec(msg)) != null) {
        //         console.log("++++Peifang="+peifang[0].name+"|"+peifang[1].name+"|"+peifang[2].name+"|"+peifang[3].name+"|"+peifang[4].name+"|"+peifang[5].name+"|"+peifang[6].name+"|"+peifang[7].name);
        //         times=0;
        //     }
        //     //console.log("times="+times);
        //     if (((matches = addJob.exec(msg)) != null||(matches = addJob2.exec(msg)) != null||(matches = getJob.exec(msg)) != null)&&peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('药材')==-1&&peifang[times].name.indexOf('药引')==-1) {
        //         //await session.sendAsync("lianyao2 add "+peifang[times].id);
        //         if(checkPeifang(peifang)){
        //             if(fangyao==1){
        //                 await session.sendAsync("lianyao2 add "+peifang[times].id);
        //             }else if(times==0){
        //                 await session.sendAsync("lianyao2 add "+peifang[times].id);
        //                 fangyao=1;
        //             }else{
        //                 await session.sendAsync("lianyao2 add "+yaocaibai[1].id);
        //             }
        //         }else{
        //             await session.sendAsync("lianyao2 add "+yaocaibai[1].id);
        //         }
        //         times++;
        //         return;
        //     }else if ((matches = tip5.exec(msg)) != null) {
        //         peifang[times].name=searchYao(matches[1]).name;
        //         peifang[times].id=searchYao(matches[1]).id;
        //         //await session.sendAsync("lianyao2 add "+peifang[times].id);
        //         await session.sendAsync("lianyao2 add "+yaocaibai[1].id);
        //         times++;
        //         return;
        //     }else if ((matches = tip1.exec(msg)) != null) {
        //         var yanse = matches[1];
        //         if(peifang[times]==null||peifang[times].name==null||peifang[times].name==''){
        //             peifang[times].name=yanse+"药材";
        //         }
        //         // if(yanse=="白色"){
        //         //     await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         // }else if(yanse=="绿色"){
        //         //     await session.sendAsync("lianyao2 add "+yaocailv[Math.floor(Math.random()*3)].id);
        //         // }else if(yanse=="蓝色"){
        //         //     await session.sendAsync("lianyao2 add "+yaocailan[Math.floor(Math.random()*3)].id);
        //         // }else{
        //         //     //await session.sendAsync("lianyao2 add "+yaocai2[Math.floor(Math.random()*6)].id);
        //         //     await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         // }
        //         //await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         await session.sendAsync("lianyao2 add "+yaocaibai[1].id);
        //         times++;
        //         return;
        //     }else if ((matches = tip2.exec(msg)) != null) {
        //         var yanse = matches[1];
        //         if(peifang[times]==null||peifang[times].name==null||peifang[times].name==''){
        //             peifang[times].name=yanse+"药引";
        //         }
        //         // if(yanse=="白色"){
        //         //     await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //         // }else if(yanse=="绿色"){
        //         //     await session.sendAsync("lianyao2 add "+yaoyinlv[Math.floor(Math.random()*3)].id);
        //         // }else if(yanse=="蓝色"){
        //         //     await session.sendAsync("lianyao2 add "+yaoyinlan[Math.floor(Math.random()*3)].id);
        //         // }else{
        //         //     //await session.sendAsync("lianyao2 add "+yaoyin2[Math.floor(Math.random()*6)].id);
        //         //     await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //         // }
        //         //await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //             await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*2)].id);
        //         times++;
        //         return;
        //     }else if ((matches = tip3.exec(msg)) != null) {
        //         // if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('白色')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('绿色')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaocailv[Math.floor(Math.random()*3)].id);
        //         // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('蓝色')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaocailan[Math.floor(Math.random()*3)].id);
        //         // }else{
        //         //     //await session.sendAsync("lianyao2 add "+yaocai2[Math.floor(Math.random()*6)].id);
        //         //     await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         // }
        //         //await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         await session.sendAsync("lianyao2 add "+yaocaibai[1].id);
        //         times++;
        //         return;
        //     }else if ((matches = tip4.exec(msg)) != null) {
        //         // if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('白色')>=0) {
        //         //         await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //         //     } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('绿色')>=0) {
        //         //         await session.sendAsync("lianyao2 add "+yaoyinlv[Math.floor(Math.random()*3)].id);
        //         //     } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('蓝色')>=0) {
        //         //         await session.sendAsync("lianyao2 add "+yaoyinlan[Math.floor(Math.random()*3)].id);
        //         //     }else{
        //         //         //await session.sendAsync("lianyao2 add "+yaoyin2[Math.floor(Math.random()*6)].id);
        //         //         await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //         //     }
        //             //await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //             await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*2)].id);
        //             times++;
        //         return;
        //     }else if ((matches = addJob.exec(msg)) != null||(matches = addJob2.exec(msg)) != null) {
        //         // if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('白色药材')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('绿色药材')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaocailv[Math.floor(Math.random()*3)].id);
        //         // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('蓝色药材')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaocailan[Math.floor(Math.random()*3)].id);
        //         // }else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('白色药引')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //         // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('绿色药引')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaoyinlv[Math.floor(Math.random()*3)].id);
        //         // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('蓝色药引')>=0) {
        //         //     await session.sendAsync("lianyao2 add "+yaoyinlan[Math.floor(Math.random()*3)].id);
        //         // }else{
        //         //     await session.sendAsync("lianyao2 add "+yaocai2[Math.floor(Math.random()*6)].id);
        //         // }
        //         //await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //         await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*2)].id);
        //         times++;
        //         return;
        //     }else if ((matches = goodJob.exec(msg)) != null) {
        //         var pf = "++++Peifang="+peifang[0].name+"|"+peifang[1].name+"|"+peifang[2].name+"|"+peifang[3].name+"|"+peifang[4].name+"|"+peifang[5].name+"|"+peifang[6].name+"|"+peifang[7].name;
        //         console.log("++++Peifang="+pf);
        //         fs.appendFile("peifang.txt",pf+"\r\n",function(){});
        //         peifang=[{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""},{name:"",id:""}];
        //         FailedTimes=0;
        //         fangyao=0;
        //         await session.sendAsync("lianyao2 start 4");
        //         return;
        //     }else if ((matches = startJob.exec(msg)) != null||(matches = startJob2.exec(msg)) != null) {
        //         FailedTimes++;
        //         fangyao=0;
        //         console.log("++Failed TImes:"+FailedTimes);
        //         await session.sendAsync("lianyao2 start 4");
        //         return;
        //     }else if ((matches = getJob2.exec(msg)) != null) {
        //         await session.sendAsync("lianyao2 stop");
        //         return;
        //     }else if ((matches = getJob.exec(msg)) != null) {
        //         if(times==8){
        //             await session.sendAsync("lianyao2 stop");
        //         }else{
        //             // if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('白色药材')>=0) {
        //             //     await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //             // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('绿色药材')>=0) {
        //             //     await session.sendAsync("lianyao2 add "+yaocailv[Math.floor(Math.random()*3)].id);
        //             // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('蓝色药材')>=0) {
        //             //     await session.sendAsync("lianyao2 add "+yaocailan[Math.floor(Math.random()*3)].id);
        //             // }else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('白色药引')>=0) {
        //             //     await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*3)].id);
        //             // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('绿色药引')>=0) {
        //             //     await session.sendAsync("lianyao2 add "+yaoyinlv[Math.floor(Math.random()*3)].id);
        //             // } else if (peifang[times]!=null&&peifang[times].name!=null&&peifang[times].name!=''&&peifang[times].name.indexOf('蓝色药引')>=0) {
        //             //     await session.sendAsync("lianyao2 add "+yaoyinlan[Math.floor(Math.random()*3)].id);
        //             // }else{
        //             //     await session.sendAsync("lianyao2 add "+yaocai2[Math.floor(Math.random()*6)].id);
        //             // }
        //             //await session.sendAsync("lianyao2 add "+yaocaibai[Math.floor(Math.random()*3)].id);
        //             await session.sendAsync("lianyao2 add "+yaoyinbai[Math.floor(Math.random()*2)].id);
        //             times++;
        //         }
        //         return;
        //     }
            
        // };
        // function checkPeifang(pfang:yao []):boolean {
        //     for (const key in pfang) {
        //         if (pfang[key].name==''||pfang[key].name.indexOf('药材')>=0||pfang[key].name.indexOf('药引')>=0) {
        //             return false;
        //         }
        //     }
        //     return true;
        // }
        // function searchYao(name:string):yao {
        //     for (const key in yaocai) {
        //         if (name.indexOf(yaocai[key].name)>=0) {
        //             return yaocai[key];
        //         }
        //     }
        //     for (const key in yaoyin) {
        //         if (name.indexOf(yaoyin[key].name)>=0) {
        //             return yaoyin[key];
        //         }
        //     }
        //     return yaocai[0];
        // }
        async function processData(data: Data) {
            // if (data.type==='dialog'&&data.dialog === "score") {
            //     console.log("经验："+data.exp);
            //     console.log("潜能："+data.pot);
            //     console.log("当前气血："+data.hp);
            //     console.log("当前内力："+data.mp);
            //     //await session.sendAsync(`${pty} 所有任务完毕，小的告退..`);
            // }
        };
        async function processMsg(data: Msg) {
            // if(data.ch === 'pty'){
            //     if(data.name==='咬人的豆包'){
            //         console.log("收到命令："+data.content);
            //         if(data.content.includes('威廉剑')&&data.content.includes('状态')){
            //             await session.sendAsync("score");
            //         }
            //     }
            // }
        };
        session.on('message', processMessage);
        session.on('data', processData);
        session.on('msg', processMsg);
        // await Promise.delay(5050);
        await callback();
        // this.priority = -1;        

        while (true) {
            if (this.isCancellationRequested) {
                session.removeListener('message', processMessage);
                session.removeListener('data', processData);
                session.removeListener('msg', processMsg);
                break;
            }
            await Promise.delay(1000 * 60 * 1);
            await session.sendAsync("look");
        }
    }


}


