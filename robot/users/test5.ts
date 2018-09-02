import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test5: UserConfig = {
    key: "test5",
    name: "咬人的豆包",
    server: 2,
    account: {
        code: "apollozz",
        pwd: "1982525"
    },
    tasks: [
        //new tasks.ChrisTask()
        new tasks.XiyanTask()
        //new tasks.MineTask()
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "heuh2915933", new Date(2018, 4, 21))
    ]
};