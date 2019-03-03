import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var chris3: UserConfig = {
    key: "chris3",
    name: "施珺",//白如盈
    server: 2,
    account: {
        code: "apollozzzz",//apollozzzz
        pwd: "1982525"
    },
    tasks: [
        new tasks.ChrisTask2()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};