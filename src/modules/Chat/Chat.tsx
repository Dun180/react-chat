import React, {useEffect} from 'react';
import useAsyncEffect from 'use-async-effect';
import style from './Chat.module.scss'
import axios from "axios";
import IO from 'socket.io-client';
import {fetchTest, sendMsg} from "@/lib/api";
import {Button, Form, Input, message, Tabs} from "antd";

const Chat = () => {
    useAsyncEffect(async () => {

        // const res = await fetchTest()
        // console.log(res)
        // const socket = IO('http://127.0.0.1:7001/hello',{path: '/testPath'});
        // const data2: { name: any; xx: any; id: any; fj: any; }[] = []
        // socket.on('data', msg => {
        //     if (msg.data != null) {
        //         let data3 = {
        //             name: msg.xx.name,
        //             xx: msg.data,
        //             id: msg.id,
        //             fj: msg.xx.fjh
        //         }
        //         data2.push(data3)
        //     }
        //
        //     console.log('服务端消息', msg, data2)
        // })
        // socket.on('connect', () => {
        //     console.log(socket.connected) // true
        // })
        //
        // socket.on('disconnect', () => {
        //     console.log(socket.connected) // false
        // })
        // socket.emit('data',  '09')
    });
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        await sendMsg(values.username,values.password)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={style.chat}>
            {/*<Form*/}
            {/*    name="basic"*/}
            {/*    labelCol={{ span: 8 }}*/}
            {/*    wrapperCol={{ span: 16 }}*/}
            {/*    initialValues={{ remember: true }}*/}
            {/*    onFinish={onFinish}*/}
            {/*    onFinishFailed={onFinishFailed}*/}
            {/*    autoComplete="off"*/}
            {/*>*/}
            {/*    <Form.Item*/}
            {/*        label="Username"*/}
            {/*        name="username"*/}
            {/*        rules={[{ required: true, message: 'Please input your username!' }]}*/}
            {/*    >*/}
            {/*        <Input />*/}
            {/*    </Form.Item>*/}

            {/*    <Form.Item*/}
            {/*        label="Password"*/}
            {/*        name="password"*/}
            {/*        rules={[{ required: true, message: 'Please input your password!' }]}*/}
            {/*    >*/}
            {/*        <Input.Password />*/}
            {/*    </Form.Item>*/}


            {/*    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>*/}
            {/*        <Button type="primary" htmlType="submit">*/}
            {/*            Submit*/}
            {/*        </Button>*/}
            {/*    </Form.Item>*/}
            {/*</Form>*/}
        </div>
    )
}
export default Chat
