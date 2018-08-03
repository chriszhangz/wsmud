import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test4: UserConfig = {
    key: "test4",
    name: "戚镰剑",
    server: 2,
    account: {
        code: "apollozz1",
        pwd: "1982525"
    },
    tasks: [
        //new tasks.MapTask()
        //new tasks.MineTask()
        new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
    ]
};