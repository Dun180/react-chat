import React, {useEffect, useState} from "react";
import {SearchOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Tabs, Divider, Avatar, message} from 'antd';
import style from './AddFriend.module.scss'
import {addFriend, queryUser} from "@/lib/api";
import {chunk} from "@/utils/utils";
import {useSelector} from "react-redux";
const AddFriend = () => {
    const [userBoxActive,setUserBoxActive] = useState(false)
    const [activeKey,setActiveKey] = useState('1')

    const [groupBoxActive,setGroupBoxActive] = useState(false)
    const [userData,setUserData] = useState([])
    const userInfo = useSelector((state: any) => state.userInfo.value)

    const { TabPane } = Tabs;

    const [userForm] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [, forceUpdate] = useState({});


    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const handleAddFriend = async (to: string) => {
        console.log(userInfo)
        const data = {from: userInfo._id, to: to}
        const resp = await addFriend(data)
        if (resp.code === 200) {
            console.log(resp)
            message.success('添加成功')

        }else {
            message.error(resp.msg)

        }
    }

    const onUserFinish = async (values: any) => {
        const resp = await queryUser(values.name)
        console.log(resp)
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
                                            userData.map((userList: any,index) => {
                                                return(

                                                        <div className={style.box_row} key={index}>
                                                            {
                                                                userList.map((user: any) => {
                                                                    return (
                                                                            <nav className={style.item} key={user._id}>
                                                                                <Avatar className={style.avatar} size={60} icon={<UserOutlined />} />
                                                                                <div className={style.info}>
                                                                                    <span>{user.name}</span>
                                                                                    <Button type="primary" size={"small"} onClick={() => handleAddFriend(user._id)}>
                                                                                        加好友
                                                                                    </Button>

                                                                                </div>

                                                                            </nav>
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
                                <React.Fragment>
                                    <Divider />
                                    <div className={style.result_box}>

                                    </div>
                                </React.Fragment>

                            ) : null
                        }
                    </div>

                </TabPane>
            </Tabs>
        </div>
    )
}
export default AddFriend
