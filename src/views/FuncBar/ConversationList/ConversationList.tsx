import React, {useState} from "react";
import style from './ConversationList.module.scss'
import {Avatar, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import useAsyncEffect from "use-async-effect";
import {queryConversation, queryFriend} from "@/lib/api";
import {useDispatch, useSelector} from "react-redux";
import {Conversation} from "@/models/interface";
import {SET_CURRENT_CONVERSATION} from "@/store/reducers/currentConversation";
import {SET_CONVERSATION_LIST} from "@/store/reducers/conversationList";
import moment from 'moment'

const ConversationList = () => {
    const userInfo = useSelector((state: any) => state.userInfo.value)
    const conversationList = useSelector((state: any) => state.conversationList) as Conversation[]

    const dispatch = useDispatch()
    useAsyncEffect(async () => {
        const resp = await queryConversation(userInfo._id)
        if (resp.code === 200){
            console.log(resp)
            dispatch(SET_CONVERSATION_LIST(resp.data))
        }else {
            message.error(resp.msg)
        }
    },[])
    const handleClickConversation = (_id: string, to: string) => {
        dispatch(SET_CURRENT_CONVERSATION({_id: _id, to: to}))
    }
    return (
        <div className={style.conversation_list}>
            <div className={style.list}>
                {
                    conversationList?.map((conversation: Conversation) => {
                        return (
                            <div className={style.conversation} key={conversation._id} onClick={() => handleClickConversation(conversation._id as string, conversation.to as string)}>
                                <Avatar className={style.avatar} size={50} icon={<UserOutlined />} />
                                <div className={style.info}>
                                    <div className={style.info_top}>
                                        <div className={style.info_name}>
                                            {conversation.name}
                                        </div>
                                        <div className={style.info_time}>
                                            {moment(conversation.updateTime).format('HH:mm')}
                                        </div>
                                    </div>

                                    <div className={style.info_message}>
                                        {conversation.message}&nbsp;
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ConversationList
