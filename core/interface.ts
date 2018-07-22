
export interface Server {
    ID: number;
    Name: string;
    IP: string;
    Port: number;
    IsTest?: boolean;
}

export interface Account {
    code: string;
    pwd: string;
}

export interface AccountToken {
    code: number;
    message: string;
    u: string;
    p: string;
}



