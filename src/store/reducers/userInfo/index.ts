import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        value: JSON.parse(sessionStorage.getItem("userInfo") as string) || ''
    },
    reducers: {
        SET_USERINFO: (state, {payload}) => {
            console.log(payload)
            state.value = payload
            sessionStorage.setItem("userInfo", JSON.stringify(payload))
        },
        REMOVE_USERINFO: state => {
            state.value = ''
            sessionStorage.removeItem("userInfo")
        }
    }
})

export const { SET_USERINFO, REMOVE_USERINFO } = userInfo.actions
export default userInfo;
