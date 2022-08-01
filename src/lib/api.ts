import http from "@/utils/http";
import {Result, Response} from "@/models/result";
import axios from "axios";
import fetch from "@/utils/fetch";

export async function test(){
    return await http.get<Result<Object>>("/")
}

export async function login(form: any){
    return new Promise<Response>(async (resolve, reject) => {
        await axios.post("/login", form)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

export async function register(data: any){
    return await http.post<Result<Object>>("/register",data)
}

export const fetchTest = async () => {
    return await fetch('data',  '09')
}
