import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        value: sessionStorage.getItem("userInfo") || ''
    },
    reducers: {
        incremented: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = ''
        },
        decremented: state => {
            state.value = ''
        }
    }
})

export const { incremented, decremented } = userInfo.actions
export default userInfo;
