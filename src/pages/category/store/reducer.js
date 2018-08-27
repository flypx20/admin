import * as types from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	isFetching:false,
	pageSize:5,
    total:50,
    current:4,
    list:[]
});
export default (state=defaultItem,action)=>{
	if (action.type == types.USER_REQUEST) {
		return state.set('isFetching',true);
	}
	if (action.type == types.USER_DONE) {
		return state.set('isFetching',false);
	}
	if (action.type == types.USER_STATE) {
		console.log(action.payload);
		/*return state.merge({
			'isFetching':false,
			pageSize:5,
    		total:50,
    		current:4,
   			list:[]
		});*/
		return state.set('isFetching',false);
	}
	return state;
};