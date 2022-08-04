import {Message} from "@/models/interface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Message[] | null = null;

const messageList = createSlice({
    name:'messageList',
    initialState,
    reducers: {
        SET_MESSAGE_LIST:(state, {payload}) => {
            state = payload
        },

        ADD_MESSAGE:(state:Message[] | null, {payload}) => {
            state?.push(payload)
        },
    }
})

export const { SET_MESSAGE_LIST } = messageList.actions
export default messageList
