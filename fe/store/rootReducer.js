import { combineReducers } from 'redux';
import loginReducer from './slices/loginSlice';

const rootReducer = combineReducers({
    login: loginReducer,
});

export default rootReducer;