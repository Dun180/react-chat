import React from 'react';
import style from './Dialog.module.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Dialog = (props: any) => {
    return (
        <div className={style.dialog_container}>
            {
                props.isSender?(
                    <div className={style.right_dialog}>
                        {props.message}
                        <Avatar size="large" icon={<UserOutlined />} style={{margin: '10px'}}/>
                    </div>
                ):(
                    <div >
                        <Avatar size="large" icon={<UserOutlined />} style={{margin: '10px'}}/>
                        {props.message}
                    </div>
                )

            }

        </div>
    )
}

export default Dialog
