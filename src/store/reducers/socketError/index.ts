import {createSlice} from "@reduxjs/toolkit";

const socketError = createSlice({
    name: 'socketError',
    initialState: '',
    reducers: {
        SET_SOCKET_ERROR: (state, {payload}) => {
            console.log(payload)
            return payload
        },
    }
})

export const {SET_SOCKET_ERROR} = socketError.actions
export default socketError
