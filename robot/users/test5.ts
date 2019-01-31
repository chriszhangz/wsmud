import { UserConfig } from "../interface";
import * as tasks from "../tasks";
//let cmds: string[] = ['jh fam 4 start','go west'];
let cmds: string[] = ['jh fam 3 start'];
export var test5: UserConfig = {
    key: "test5",
    name: "洛玖尧",
    server: 2,
    account: {
        code: "llfxgx",
        pwd: "497970474"
    },
    tasks: [
        //new tasks.ChrisTask()
        new tasks.AutoTask(cmds,"高根明")
        //new tasks.MineTask()
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
    ]
};