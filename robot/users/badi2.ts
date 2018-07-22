import { UserConfig } from "../interface";
import * as tasks from "../tasks";
export var badi2: UserConfig = {
    key: "badi2",
    name: "巴蒂",
    server: 2,
    account: {
        code: "",
        pwd: ""
    },
    tasks: [
        new tasks.BadiTask()
    ]
};