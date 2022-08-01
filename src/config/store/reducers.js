import { combineReducers } from 'redux';
import LoginReducer from '../../modules/auth/Login/reducer';
import GlobalReducer from './global/reducer';
import RegisterReducer from '../../modules/auth/Register/reducer';
import HomeReducer from '../../modules/main/Home/reducer';
import HistoryReducer from '../../modules/user/History/reducer';

const combine = combineReducers({
    global: GlobalReducer,
    LoginReducer,
    RegisterReducer,
    HomeReducer,
    HistoryReducer
})

export { combine }