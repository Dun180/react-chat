import { combineReducers} from "redux";
import userInfo from "./userInfo";
import token from "./token";
import conversationList from "./conversationList";
import messageList from "./messageList";
const rootReducer = combineReducers({
    userInfo: userInfo.reducer,
    token: token.reducer,
    conversationList: conversationList.reducer,
    messageList: messageList.reducer
})

export default rootReducer;
