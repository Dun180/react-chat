import {createSlice} from "@reduxjs/toolkit";

const currentConversation = createSlice({
    name: 'currentConversation',
    initialState: {
        _id: '',
        to: '',
    },
    reducers: {
        SET_CURRENT_CONVERSATION: (state, {payload}) => {
            return payload
        },
    }
})

export const {SET_CURRENT_CONVERSATION} = currentConversation.actions
export default currentConversation
