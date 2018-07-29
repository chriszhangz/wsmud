import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var test3: UserConfig = {
    key: "test3",
    name: "水碧",
    server: 2,
    account: {
        code: "apollozz1",
        pwd: "1982525"
    },
    tasks: [
        new tasks.MineTask2()
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};