import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var chris2: UserConfig = {
    key: "chris2",
    name: "你也不懂",//白如盈
    server: 2,
    account: {
        code: "look5454",//apollozzzz
        pwd: "22369210"
    },
    tasks: [
        new tasks.ChrisTask2()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};