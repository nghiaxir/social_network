import { combineReducers } from "redux";
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileRuducer'
import status from './statusReducer'
import homePost from './postReducer'
export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePost,
})