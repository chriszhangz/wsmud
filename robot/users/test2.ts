import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test2: UserConfig = {
    key: "test2",
    name: "戚镰剑",
    server: 2,
    account: {
        code: "apollozz1",
        pwd: "1982525"
    },
    tasks: [
        //new tasks.MapTask()
        new tasks.MineTask()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};