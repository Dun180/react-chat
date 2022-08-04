import React, {useState} from "react";
import style from './FuncBar.module.scss'
import { Outlet } from "react-router-dom"
import {PlusOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import AddFriend from "@/views/FuncBar/AddFriend/AddFriend";

const FuncBar = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={style.func_bar}>
            <div className={style.func_top}>
                <PlusOutlined className={style.icon_add} onClick={showModal}/>
            </div>
            <Outlet></Outlet>
            <Modal
                title=""
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                closable={false}
                footer={null}
            >
                <AddFriend />
            </Modal>
        </div>
    )
}
export default FuncBar
