import React, { useState } from 'react';
import style from './Sidebar.module.scss'
import { UserOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Modal, Button, Tabs, Form, Input, message } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import Login from '@/modules/Sidebar/Login/Login'
import UserInfo from "@/modules/Sidebar/UserInfo/UserInfo";
import {REMOVE_TOKEN} from "@/store/reducers/token";
import {REMOVE_USERINFO} from "@/store/reducers/userInfo";
const Sidebar = () => {
    const userInfo = useSelector((state: any) => state.userInfo)
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isUserInfoModalVisible, setIsUserInfoModalVisible] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [userInfoLoading, setUserInfoLoading] = useState(false);
    const dispatch = useDispatch();

    const { confirm } = Modal;

    const logout = () => {
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(REMOVE_TOKEN())
                dispatch(REMOVE_USERINFO())
            },
            onCancel() {
            },
        });
    };
    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    };
    const showUserInfoModal = () => {
        setIsUserInfoModalVisible(true);
    };
    const handleLoginOk = () => {
        setLoginLoading(true);
        setTimeout(() => {
            setLoginLoading(false);
            setIsLoginModalVisible(false);
        }, 1000);
    };
    const handleUserInfoOk = () => {
        setUserInfoLoading(true);
        setTimeout(() => {
            setUserInfoLoading(false);
            setIsUserInfoModalVisible(false);
        }, 1000);
    };
    const handleLoginCancel = () => {
        setIsLoginModalVisible(false);
    };
    const handleUserInfoCancel = () => {
        setIsUserInfoModalVisible(false);
    };
    const handleClickAvatar = () => {
        if (userInfo.value === ''){
            showLoginModal()
        }else {
            showUserInfoModal()
        }
    }


    return (
        <div className={style.sidebar}>
            <div className={style.avatar} onClick={handleClickAvatar}>
                <Badge status="default" count={' '} size="small" offset={[-15, 55]}>
                    <Avatar size={64} icon={<UserOutlined />} />
                </Badge>
            </div>

            <LogoutOutlined className={style.icon} onClick={logout}/>
            <Modal
                title=""
                visible={isLoginModalVisible}
                onOk={handleLoginOk}
                onCancel={handleLoginCancel}
                closable={false}
                footer={null}
            >
                <Login close={handleLoginCancel}/>
            </Modal>
            <Modal
                title=""
                visible={isUserInfoModalVisible}
                onOk={handleUserInfoOk}
                onCancel={handleUserInfoCancel}
                closable={false}
                footer={null}
            >
                <UserInfo close={handleUserInfoCancel}/>
            </Modal>

        </div>
    )
}
export default Sidebar
