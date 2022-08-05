import React, {useState} from 'react';
import { Route, useNavigate  } from "react-router-dom";
import style from './Login.module.scss';
import {Button, Form, Input, message, Tabs} from "antd";
import {login, loginEvent, register} from "@/lib/api";
import {useDispatch, useSelector} from "react-redux";
import {SET_USERINFO} from "../../../store/reducers/userInfo"
import {SET_TOKEN} from "@/store/reducers/token";

const Login = (props:any) => {
    const [activeKey,setActiveKey] = useState('1')
    const [registerForm] = Form.useForm();
    const [loginForm] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userInfo)
    const { TabPane } = Tabs;

    const onFinishLogin = async (values: any) => {
        console.log('Success:', values);
        const resp = await login(values)
        console.log(resp)
        if (resp.data.code === 200){

            const token = resp.headers['authorization']
            const userInfo = resp.data.data
            message.success('登录成功');
            await loginEvent(userInfo._id)
            // navigate('/')
            props.close()
            dispatch(SET_USERINFO(userInfo))
            dispatch(SET_TOKEN(token))


        }else {
            message.error(resp.data.msg);
        }
    };
    const onFinishRegister = async (values: any) => {
        console.log('Success:', values);
        const resp = await register({username:values.username,password:values.password})
        if (resp.code === 200){
            message.success('注册成功');
            registerForm.resetFields();
            setActiveKey('1');
        }else {
            message.error(resp.msg);
        }
    };
    const onFinishLoginFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onFinishRegisterFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onTabClick = (key: any) => {
        setActiveKey(key)
    }
    return (
        <div className={style.login}>
            <Tabs
                activeKey={activeKey}
                centered
                onTabClick={onTabClick}
            >
                <TabPane tab="登录" key="1">
                    <Form
                        name="login"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishLogin}
                        onFinishFailed={onFinishLoginFailed}
                        autoComplete="off"
                        form={loginForm}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                    <Form
                        name="register"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishRegister}
                        onFinishFailed={onFinishRegisterFailed}
                        autoComplete="off"
                        form={registerForm}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请确认你的密码!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('密码不一致!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Login
