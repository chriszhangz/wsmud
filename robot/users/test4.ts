import { UserConfig } from "../interface";
import * as tasks from "../tasks";
let cmds: string[] = ['jh fam 5 start'];
export var test4: UserConfig = {
    key: "test4",
    name: "洛玖尧",
    server: 2,
    account: {
        // code: "avrin09",
        // pwd: "avrin0905"
        //code: "llfxgx",
        //pwd: "497970474"
        code: "llfxgx",
        pwd: "497970474"
    },
    tasks: [
        new tasks.AutoTask(cmds,"苏星河")
        //new tasks.AiTask()
        //new tasks.MineTask()
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
    ]
};