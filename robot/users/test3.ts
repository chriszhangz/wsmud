import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test3: UserConfig = {
    key: "test3",
    name: "戚镰剑",
    server: 2,
    account: {
        code: "apollozz1",
        pwd: "1982525"
    },
    tasks: [
        //new tasks.MineTask2()
        new tasks.TestTask()
        //new tasks.RecordTask()
        //new tasks.ChrisTask2()
        //new tasks.AutoTask(['jh fam 5 start'],"苏星河")
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};