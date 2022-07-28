import { combineReducers} from "redux";
import count from './count';
import userInfo from "./userInfo";
import token from "./token";
const rootReducer = combineReducers({
    count: count.reducer,
    userInfo: userInfo.reducer,
    token: token.reducer,
})

export default rootReducer;
