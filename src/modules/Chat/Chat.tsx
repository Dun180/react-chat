import React, {useEffect} from 'react';
import useAsyncEffect from 'use-async-effect';
import style from './Chat.module.scss'
import axios from "axios";
const Chat = () => {
    useAsyncEffect(async () => {
        const res2 = await axios.get('/api')
        console.log(res2)
    });


    // useEffect(() => {
    //     fetch('/api')
    //         // .then(res => res.json()) // comment this out for now
    //         .then(res => res.text())          // convert to plain text
    //         .then(text => console.log(text))  // then log it out
    // });

    return (
        <div className={style.chat}>
        </div>
    )
}
export default Chat
