import http from "@/utils/http";
import {Result, Response} from "@/models/result";
import axios from "axios";
import fetch from "@/utils/fetch";
import exp from "constants";
import {Conversation, Friend, Message, User} from "@/models/interface";

//#region axios

export async function test() {
    return await http.get<Result<Object>>('/')
}

export const login = async (form: any) => {
    return new Promise<Response>(async (resolve, reject) => {
        await axios.post('/login', form)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

export const register = async (data: any) => {
    return await http.post<Result<Object>>('/register', data)
}

export const queryUser = async (name: string) => {
    return await http.get<Result<User[]>>('/user/query', {name: name})
}

export const addFriend = async (data: Friend) => {
    return await http.post<Result<Object>>('/friend/add', data)
}

export const queryFriend = async (id: string) => {
    return await http.get<Result<User[]>>('/friend/query', {id: id})
}

export const addConversation = async (data: Conversation) => {
    return await http.post<Result<Conversation>>('/conversation/add',data)
}

export const queryConversation = async (id: string) => {
    return await http.get<Result<Conversation[]>>('/conversation/query', {id: id})
}

export const queryMessage = async (to: string) => {
    return await http.get<Result<Message[]>>('/message/query', {to: to})

}
//#endregion

//#region socket
export const fetchTest = async () => {
    return await fetch('data',  '09')
}

export const loginEvent = async (id: string) => {
    return await fetch('login', id)
}

export const sendMsg = async (msg: Message) => {
    return await fetch('sendMsg',msg)
}
//#endregion
