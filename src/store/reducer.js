import { combineReducers } from 'redux-immutable';
import { reducer as todoListReducer } from '../pages/login/store/';


export default  combineReducers({
	todoList:todoListReducer
});