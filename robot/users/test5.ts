import { UserConfig } from "../interface";
import * as tasks from "../tasks";
//let cmds: string[] = ['jh fam 4 start','go west'];
let cmds: string[] = ['jh fam 1 start','go north'];
export var test5: UserConfig = {
    key: "test5",
    name: "江暮雨",
    server: 2,
    account: {
        code: "xiaozhi986",
        pwd: "860820"
    },
    tasks: [
        //new tasks.ChrisTask()
        new tasks.AutoTask(cmds,"宋远桥")
        //new tasks.MineTask()
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
    ]
};