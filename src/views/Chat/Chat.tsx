import React, {useState} from 'react';
import style from './Chat.module.scss'
import {Input, message, Button} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import useAsyncEffect from "use-async-effect";
import {queryMessage, sendMsg} from "@/lib/api";
import {SET_MESSAGE_LIST} from "@/store/reducers/messageList";
import {Message} from "@/models/interface";

const Chat = () => {
    const { TextArea } = Input;
    const currentConversation = useSelector((state: any) => state.currentConversation)
    const messageList = useSelector((state: any) => state.messageList) as Message[]
    const [messageContent, setMessageContent] = useState('')
    const userInfo = useSelector((state: any) => state.userInfo.value)
    const dispatch = useDispatch()

    useAsyncEffect(async () => {
        console.log(currentConversation)
        const resp = await queryMessage(currentConversation.to)
        if (resp.code === 200){
            console.log(resp)
            dispatch(SET_MESSAGE_LIST(resp.data))
        }else {
            message.error(resp.msg)
        }
    },[currentConversation])

    const handleSendMessage = async () => {
        console.log(currentConversation)
        if (messageContent === '') {
            message.error('发送内容不能为空')
            return
        }
        const data = {
            from: userInfo._id,
            to: currentConversation.to,
            type: 'text',
            content: messageContent
        }
        await sendMsg(data)
    }

    return (
        <div className={style.chat_container}>
            <div className={style.chat_box}>
                <div className={style.chat_top}></div>
                <div className={style.chat_content}>
                    <div>222</div>
                    {
                        messageList?.map((message: Message) => {
                            return (
                                <div key={message._id}>
                                    111 {message.content}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.chat_input}>
                    <TextArea placeholder="Borderless" bordered={false} autoSize value={messageContent} onChange={e => setMessageContent(e.target.value)}/>
                    <div className={style.chat_submit}>
                        <Button type="primary" onClick={() => handleSendMessage()}>发送</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat
