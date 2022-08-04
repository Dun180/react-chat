import React, {useState} from "react";
import style from './ConversationList.module.scss'
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";


const ConversationList = () => {

    return (
        <div className={style.conversation_list}>
            <div className={style.list}>
                <div className={style.conversation}>
                    <Avatar className={style.avatar} size={50} icon={<UserOutlined />} />
                    <div className={style.info}>
                        <div className={style.info_top}>
                            <div className={style.info_name}>
                                订阅号
                            </div>
                            <div className={style.info_time}>
                                11:26
                            </div>
                        </div>

                        <div className={style.info_message}>
                            学校共青团
                        </div>
                    </div>
                </div>
                <div className={style.conversation}>
                    <Avatar className={style.avatar} size={50} icon={<UserOutlined />} />
                    <div className={style.info}>
                        <div className={style.info_top}>
                            <div className={style.info_name}>
                                订阅号
                            </div>
                            <div className={style.info_time}>
                                11:26
                            </div>
                        </div>

                        <div className={style.info_message}>
                            学校共青团
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ConversationList
