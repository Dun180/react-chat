import React from 'react';
import style from './index.module.scss'
import Sidebar from '../modules/Sidebar/Sidebar';
import FuncBar from "../modules/FuncBar/Func";
import Chat from "../modules/Chat/Chat";
const App = () => {
    console.log(style)
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
