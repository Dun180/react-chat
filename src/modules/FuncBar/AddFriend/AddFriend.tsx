import React, {useEffect, useState} from "react";
import {SearchOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Tabs, Divider, Avatar, message} from 'antd';
import style from './AddFriend.module.scss'
import {queryUser} from "@/lib/api";
import {chunk} from "@/utils/utils";
const AddFriend = () => {
    const [activeKey,setActiveKey] = useState('1')
    const [userBoxActive,setUserBoxActive] = useState(false)
    const [groupBoxActive,setGroupBoxActive] = useState(false)
    const [userData,setUserData] = useState([])
    const { TabPane } = Tabs;

    const [userForm] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [, forceUpdate] = useState({});


    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onUserFinish = async (values: any) => {
        const resp = await queryUser(values)
        if(resp.code === 200) {
            if (resp.data.length > 0) {
                setUserBoxActive(true)
                setUserData(chunk(resp.data,3))
            }
        }else {
            message.error(resp.msg)
        }

    };
    const onGroupFinish = (values: any) => {
        console.log('Finish:', values);
    };
    const onTabClick = (key: any) => {
        setActiveKey(key)
    }
    return (
        <div >
            <Tabs
                activeKey={activeKey}
                centered
                onTabClick={onTabClick}
            >
                <TabPane tab="找好友" key="1">
                    <div className={style.tab_container}>
                        <Form
                            form={userForm}
                            name="query_user"
                            layout="inline"
                            onFinish={onUserFinish}
                        >
                            <div className={style.form}>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: '请输入用户昵称' }]}
                                    wrapperCol={{ span: 50 }}
                                >
                                    <Input className={style.input} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="请输入用户昵称" />
                                </Form.Item>
                                <Form.Item shouldUpdate>
                                    {() => (
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            disabled={
                                                !userForm.isFieldsTouched(true) ||
                                                !!userForm.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            查找
                                        </Button>
                                    )}
                                </Form.Item>
                            </div>

                        </Form>
                        {
                            userBoxActive?(
                                <React.Fragment>
                                    <Divider />
                                    <div className={style.result_box}>
                                        {
                                            userData.map((userList: any) => {
                                                return(

                                                        <div className={style.box_row}>
                                                            {
                                                                userList.map((user: any) => {
                                                                    return (
                                                                            <div className={style.item}>
                                                                                <Avatar className={style.avatar} size={60} icon={<UserOutlined />} />
                                                                                <div className={style.info}>
                                                                                    <span>{user.name}</span>
                                                                                    <Button type="primary" size={"small"}>
                                                                                        加好友
                                                                                    </Button>

                                                                                </div>

                                                                            </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                )

                                            })
                                        }

                                    </div>
                                </React.Fragment>

                            ) : null
                        }

                    </div>

                </TabPane>
                <TabPane tab="找群" key="2">
                    <div className={style.tab_container}>
                        <Form
                            form={groupForm}
                            name="query_group"
                            layout="inline"
                            onFinish={onGroupFinish}
                        >
                            <div className={style.form}>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: '请输入用户昵称' }]}
                                    wrapperCol={{ span: 50 }}
                                >
                                    <Input className={style.input} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="请输入群名称" />
                                </Form.Item>
                                <Form.Item shouldUpdate>
                                    {() => (
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            disabled={
                                                !groupForm.isFieldsTouched(true) ||
                                                !!groupForm.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            查找
                                        </Button>
                                    )}
                                </Form.Item>
                            </div>

                        </Form>
                        {
                            groupBoxActive?(
                                <div>
                                    <Divider />
                                    <div className={style.result_box}>

                                    </div>
                                </div>

                            ) : null
                        }
                    </div>

                </TabPane>
            </Tabs>
        </div>
    )
}
export default AddFriend
