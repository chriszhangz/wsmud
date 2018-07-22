import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test2: UserConfig = {
    key: "test2",
    name: "叮叮叮",
    server: 2,
    account: {
        code: "wsmud01",
        pwd: "246369"
    },
    tasks: [
        new tasks.MapTask()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};