import React from 'react';
import style from './index.module.scss'
import Sidebar from '../views/Sidebar/Sidebar';
import FuncBar from "../views/FuncBar/FuncBar";
import Chat from "../views/Chat/Chat";
import {useDispatch, useSelector} from "react-redux";
import {message} from "antd";
import useAsyncEffect from "use-async-effect";
import {SET_SOCKET_ERROR} from "@/store/reducers/socketError";
const App = () => {
    const error = useSelector((state: any) => state.socketError)
    const dispatch = useDispatch()
    useAsyncEffect(async () => {
        if (error !== ''){
            console.log(error)
            message.error(error)
            dispatch(SET_SOCKET_ERROR(''))
        }
    },[error])
    return (
        <div className={style.container}>
            <div className={style.main}>
                <Sidebar></Sidebar>
                <FuncBar></FuncBar>
                <Chat></Chat>
            </div>
        </div>
    )
}
export default App
