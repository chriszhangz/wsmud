

export type Data = Msg | Roles | Items | Dialog | Room | Exits;

export interface Msg {
    type: "msg",
    ch: "chat" | "es" | "tm" | "sys" | "rumor",
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

export interface Roles {
    type: "roles",
    roles: Role[]
}

export interface Item {
    id: string,
    name: string,
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

export type Dialog = TaskDialog;

export interface TaskDialog {
    type: "dialog",
    dialog: "tasks",
    items: Task[]
}

export interface Task {
    id: string,
    title: string,
    desc: string,
    state: number
}