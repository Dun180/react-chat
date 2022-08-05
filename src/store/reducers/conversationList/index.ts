import {createSlice} from "@reduxjs/toolkit";
import {Conversation} from "@/models/interface";

const initialState: Conversation[] | null = null;

const conversationList = createSlice({
    name: 'conversationList',
    initialState,
    reducers: {
        SET_CONVERSATION_LIST: (state, {payload}) => {
            return payload
        },
        ADD_CONVERSATION: (state:Conversation[] | null, {payload}) => {

            const findRes = state?.find(element => element._id == payload._id)
            if (findRes) {
                const index = state?.indexOf(findRes)
                state?.splice(index as number,1)
            }
            state?.unshift(payload)
        },

    }

})

export const { SET_CONVERSATION_LIST, ADD_CONVERSATION } = conversationList.actions
export default conversationList
