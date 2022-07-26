export interface Result<T>{
    msg:string;
    code:number;
    data:T;
}
export interface Response{
    data:any;
    headers:any;
}
