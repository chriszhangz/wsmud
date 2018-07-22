import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test3: UserConfig = {
    key: "test3",
    name: "施珺",
    server: 2,
    account: {
        code: "apollozzzz",
        pwd: "1982525"
    },
    tasks: [
        new tasks.MapTask()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};