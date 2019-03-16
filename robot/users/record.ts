import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var record: UserConfig = {
    key: "record",
    name: "诸葛朴",
    server: 2,
    account: {
        code: "apollozz",
        pwd: "1982525"
    },
    tasks: [
        //new tasks.MineTask2()
        new tasks.RecordTask()
        //new tasks.ShimenTask("jh fam 3 start", "高根明", "956z2902a39", new Date(2018, 4, 21))
        //new tasks.SmTask("jh fam 6 start;go down", "左全", "twz221f3941", new Date(2018, 4, 21))
    ]
};