import { combineReducers } from 'redux'; 
import { reducer as formReducer }  from 'redux-form'; //frename this on the fly to make it more clear
import authReducer from './authReducer'; 

export default combineReducers({
    auth: authReducer, 
    form: formReducer
});