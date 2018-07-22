import { Roomd, Exitd } from "./interface";
import * as _yz from './yz.json'

const yz = _yz.default as Roomd[]
const rootRoom: Roomd = {
    id: "/",
    name: "root",
    desc: "root",
    level: 0,
    exits: [
        { type: "cmd", to: "yz", action: "jh fam 0 start" },
        { type: "cmd", to: "wd", action: "jh fam 1 start" },
        { type: "cmd", to: "shaolin", action: "jh fam 2 start" },
       // { type: "cmd", to: "huashan", action: "jh fam 3 start" },
        { type: "cmd", to: "emei", action: "jh fam 4 start" },
        { type: "cmd", to: "xiaoyao", action: "jh fam 5 start" },
        { type: "cmd", to: "gaibang", action: "jh fam 6 start" }
    ]
}

export { Roomd, Exitd, rootRoom, yz }
