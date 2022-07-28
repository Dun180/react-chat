import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {REMOVE_USERINFO} from "../../../store/reducers/userInfo"
import {REMOVE_TOKEN} from "@/store/reducers/token";
const UserInfo = (props: any) => {
    const userInfo = useSelector((state: any) => state.userInfo)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(REMOVE_TOKEN())
        dispatch(REMOVE_USERINFO())
        props.close()
    }
    return(
        <div>
            <div>id:{userInfo.value.id}</div>
            <div>name:{userInfo.value.name}</div>
            <Button type="primary" onClick={logout}>
                退出登录
            </Button>
        </div>
    )
}

export default UserInfo
