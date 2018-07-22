import { UserConfig } from "../interface";
import { SmTask } from "../tasks";
export var wd2: UserConfig = {
    key: "wd2",
    name: "叮叮当",
    server: 2,
    account: {
        code: "",
        pwd: ""
    },
    tasks: [
        new SmTask("jh fam 1 start;go north", "宋远桥", "gzfr2146931", new Date(2018, 4, 21))
    ]
};
