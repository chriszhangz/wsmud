import { UserConfig } from "../interface";
import * as tasks from "../tasks";
let cmds: string[] = ['jh fam 6 start','go down'];
export var test2: UserConfig = {
    key: "test2",
    name: "水碧",
    server: 2,
    account: {
        code: "apollozz1",
        pwd: "1982525"
    },
    tasks: [
        new tasks.AutoTask(cmds,"左全")
        //new tasks.MapTask()
        //new tasks.AutoTask2()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};