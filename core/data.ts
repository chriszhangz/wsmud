

export type Data = Msg | Roles | Items | Dialog | Room | Exits | RoomItem | Combat | Sc | Die;

export interface Msg {
    type: "msg",
    ch: "chat" | "es" | "tm" | "sys" | "rumor" | "pty",
    uid: string,
    lv: number,
    content: string,
    name: string
}

export interface Role {
    id: string,
    title: string,
    name: string
}

export interface Die {
    type: "die",
    relive: boolean
}

export interface Combat {
    type: "combat",
    start: number,
    end: number
}

export interface Sc {
    type: "sc",
    id: string,
    hp: number,
    mp: number
}

export interface RoomItem {
    type: "item",
    id: string,
    desc: string
}

export interface Roles {
    type: "roles",
    roles: Role[]
}

export interface Item {
    id: string,
    name: string,
    hp:number,
    max_hp:number,
    p:number
}

export interface Items {
    type: "items",
    items: Item[]
}

export interface Perform {
    type: "perform",
    skills: any[]
}

export interface Room {
    type: "room",
    path: string,
    name: string,
    desc: string,
    commands: any[]
}

export interface Exits {
    type: "exits",
    items: any
}

export type Dialog = TaskDialog | PackDialog | ScoreDialog;

export interface TaskDialog {
    type: "dialog",
    dialog: "tasks",
    items: Task[]
}

export interface PackDialog {
    type: "dialog",
    dialog: "pack",
    name: string,
    id: string,
    items: Item[]
}

export interface ScoreDialog {
    type: "dialog",
    dialog: "score",
    name: string,
    id: string,
    age: string,
    exp: number,
    pot: number,
    hp: number,
    max_hp: number,
    mp: number,
    max_mp: number,
    limit_mp: number,
    gj:number,
    fy:number,
    mz:number,
    ds:number,
    zj:number,
    bj:string,
    master:string,
    family:string
}

export interface Task {
    id: string,
    title: string,
    desc: string,
    state: number
}