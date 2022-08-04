import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";

const UserInfo = (props: any) => {
    const userInfo = useSelector((state: any) => state.userInfo)


    return(
        <div>
            <div>id:{userInfo.value.id}</div>
            <div>name:{userInfo.value.name}</div>

        </div>
    )
}

export default UserInfo
