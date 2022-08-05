import { combineReducers} from "redux";
import userInfo from "./userInfo";
import token from "./token";
import conversationList from "./conversationList";
import messageList from "./messageList";
import currentConversation from "./currentConversation";
import SocketError from "./socketError";
const rootReducer = combineReducers({
    userInfo: userInfo.reducer,
    token: token.reducer,
    conversationList: conversationList.reducer,
    messageList: messageList.reducer,
    currentConversation: currentConversation.reducer,
    socketError: SocketError.reducer
})

export default rootReducer;
