export interface Roomd {
    id: string,
    name: string,
    desc: string,
    level: number,
    parent?: string
    parentToHere?: Exitd,
    exits: Exitd[]
}


export type Exitd = GoExitd | CmdExitd | PromiseExitd;

interface GoExitd {
    type: "go",
    action: string,
    to: string
}


interface CmdExitd {
    type: "cmd",
    action: string,
    to: string
}

interface PromiseExitd {
    type: "promise",
    action: Promise<void>,
    to: string
}

