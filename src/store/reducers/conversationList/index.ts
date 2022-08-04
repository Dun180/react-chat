import {createSlice} from "@reduxjs/toolkit";
import {Conversation} from "@/models/interface";

const initialState: Conversation[] | null = null;

const conversationList = createSlice({
    name:'conversationList',
    initialState,
    reducers: {
        SET_CONVERSATION_LIST: (state, {payload}) => {
            state = payload
        },


    }

})

export const { SET_CONVERSATION_LIST } = conversationList.actions
export default conversationList
