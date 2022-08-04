export interface Friend{
    from?: string;
    to?: string;
}

export interface User {
    _id?: string;
    name?: string;
}

export interface Conversation {
    _id?: string;
    user?: string;
    contact?: string;
    group?: string;
    message?: string;
    updateTime?: number;
}

export interface Message {
    _id?: string;
    from?: string;
    to?: string;
    type?: string;
    content?: string;
    createTime?: number;
}
