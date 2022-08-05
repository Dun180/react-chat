import React, {useState} from "react";
import style from "./ContactList.module.scss"
import {Avatar, message, Tabs} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {User} from "@/models/interface";
import useAsyncEffect from "use-async-effect";
import {addConversation, queryFriend} from "@/lib/api";
import {useNavigate} from "react-router-dom";
import {SET_CURRENT_CONVERSATION} from "@/store/reducers/currentConversation";


const ContactList = () => {
    const [activeKey,setActiveKey] = useState('1')
    const userInfo = useSelector((state: any) => state.userInfo.value)
    const [friendList, setFriendList] = useState([] as User[])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useAsyncEffect(async () => {
        const resp = await queryFriend(userInfo._id)
        if (resp.code === 200){
            console.log(resp)
            setFriendList(resp.data)
        }else {
            message.error(resp.msg)
        }
    },[])

    const handleAddConversation = async (contact: string) => {
        const data = {
            user: userInfo._id,
            to: userInfo._id > contact? contact + userInfo._id: userInfo._id + contact,
        }
        const resp = await addConversation(data)
        if (resp.code === 200) {
            console.log(resp)
            dispatch(SET_CURRENT_CONVERSATION({_id: resp.data._id, to: resp.data.to}))
            navigate('/conversation')
        }else {
            message.error(resp.msg)
        }

    }
    const onTabClick = (key: any) => {
        setActiveKey(key)
    }
    const { TabPane } = Tabs;

    return (
        <div className={style.contact_list}>
            <Tabs
                activeKey={activeKey}
                centered
                onTabClick={onTabClick}
            >
                <TabPane tab="好友" key="1">
                    <div className={style.list}>
                        {
                            friendList.map((friend) => {
                                return (
                                    <div className={style.contact} key={friend._id} onClick={() => handleAddConversation(friend._id as string)}>
                                        <Avatar className={style.avatar} size={30} icon={<UserOutlined />} />
                                        <div className={style.info}>
                                            <div className={style.info_name}>
                                                {friend.name}
                                            </div>

                                        </div>
                                    </div>

                                )
                            })
                        }


                    </div>
                </TabPane>
                <TabPane tab="群聊" key="2">
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ContactList
