import React from 'react';
import style from './Chat.module.scss'
import {Input} from 'antd';

const Chat = () => {
    const { TextArea } = Input;
    return (
        <div className={style.chat_container}>
            <div className={style.chat_box}>
                <div className={style.chat_top}></div>
                <div className={style.chat_content}></div>
                <div className={style.chat_input}>
                    <TextArea placeholder="Borderless" bordered={false} autoSize />
                </div>
            </div>
        </div>
    )
}
export default Chat
