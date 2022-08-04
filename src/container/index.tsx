import React from 'react';
import style from './index.module.scss'
import Sidebar from '../views/Sidebar/Sidebar';
import FuncBar from "../views/FuncBar/FuncBar";
import Chat from "../views/Chat/Chat";
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
