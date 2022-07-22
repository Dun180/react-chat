import { combineReducers} from "redux";
import count from './count';
import userInfo from "./userInfo";

const rootReducer = combineReducers({
    count: count.reducer,
    userInfo: userInfo.reducer,

})

export default rootReducer;
