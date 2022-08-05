import {Message} from "@/models/interface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Message[] | null = null;

const messageList = createSlice({
    name:'messageList',
    initialState,
    reducers: {
        SET_MESSAGE_LIST:(state, {payload}) => {
            return payload
        },

        ADD_MESSAGE:(state:Message[] | null, {payload}) => {
            state?.push(payload)
        },
    }
})

export const { SET_MESSAGE_LIST, ADD_MESSAGE } = messageList.actions
export default messageList
