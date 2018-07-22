import { Account } from "../core";
import { Task } from "./task";


export interface UserConfig {
    key: string,
    server: number,
    account: Account,
    name: string,
    daemonAccount?: Account,
    daemonName?: string;
    tasks: Task[]
}


