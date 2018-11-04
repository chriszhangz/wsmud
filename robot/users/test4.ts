import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test4: UserConfig = {
    key: "test4",
    name: "戚镰剑",
    server: 2,
    account: {
        // code: "avrin09",
        // pwd: "avrin0905"
        code: "apollozz1",
        pwd: "1982525"
    },
    tasks: [
        new tasks.AiTask()
        //new tasks.MineTask()
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
    ]
};