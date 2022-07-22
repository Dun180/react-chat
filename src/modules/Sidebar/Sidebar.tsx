import React, { useState } from 'react';
import style from './Sidebar.module.scss'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Badge, Modal, Button } from 'antd';
import { useSelector } from "react-redux";

const Sidebar = () => {
    const userInfo = useSelector((state: any) => state.userInfo)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsModalVisible(false);
        }, 1000);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleClickAvatar = () => {
        if (userInfo.value === ''){
            showModal()
        }else {
            console.log("bye")

        }
    }

    return (
        <div className={style.sidebar}>
            <div className={style.avatar} onClick={handleClickAvatar}>
                <Badge status="default" count={' '} size="small" offset={[-15, 55]}>
                    <Avatar size={64} icon={<UserOutlined />} />
                </Badge>
            </div>

            <LogoutOutlined className={style.icon}/>
            <Modal
                title=""
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                closable={false}
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
export default Sidebar
