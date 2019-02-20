import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var chris: UserConfig = {
    key: "chris",
    name: "司徒昌昊",//白如盈
    server: 2,
    account: {
        code: "apollozz",//apollozzzz
        pwd: "1982525"
    },
    tasks: [
        new tasks.ChrisTask()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};