import http from "@/utils/http";
import {Result, Response} from "@/models/result";
import axios from "axios";
import fetch from "@/utils/fetch";

//#region axios

export async function test() {
    return await http.get<Result<Object>>('/')
}

export async function login(form: any) {
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

export async function register(data: any) {
    return await http.post<Result<Object>>('/register',data)
}

export async function queryUser(name: string) {
    return await http.get<Result<Object[]>>('/user/query',name)
}


//#endregion

//#region socket
export const fetchTest = async () => {
    return await fetch('data',  '09')
}

export const loginEvent = async (id: string) => {
    return await fetch('login',id)
}

export const sendMsg = async (id: string, content: string) => {
    return await fetch('sendMsg',{from:'123',to:'content',type:'text'})
}
//#endregion
