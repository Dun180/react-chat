import { createSlice } from "@reduxjs/toolkit";

const token = createSlice({
    name: 'token',
    initialState: {
        value: localStorage.getItem("token") || ''
    },
    reducers: {
        SET_TOKEN: (state, {payload}) => {
            state.value = payload
            localStorage.setItem("token", payload)

        },
        REMOVE_TOKEN: state => {
            state.value = ''
            localStorage.removeItem("token")
        }
    }
})

export const { SET_TOKEN, REMOVE_TOKEN } = token.actions
export default token;
