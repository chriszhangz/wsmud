import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var chris: UserConfig = {
    key: "chris",
    name: "江暮雨",//白如盈
    server: 2,
    account: {
        code: "xiaozhi986",//apollozzzz
        pwd: "860820"
    },
    tasks: [
        new tasks.ChrisTask()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};