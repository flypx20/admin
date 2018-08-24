import * as types from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	isFetching:false
});
export default (state=defaultItem,action)=>{
	if (action.type == types.LOGIN_REQUEST) {
		return state.set('isFetching',true);
	}
	if (action.type == types.LOGIN_ERROR) {
		return state.set('isFetching',false);
	}
	return state;
};