import * as types from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	isFetching:false,
	categories:[],
	pageSize:5,
	total:50,
	current:1
});
export default (state=defaultItem,action)=>{
	if (action.type == types.CATEGORY_REQUEST) {
		return state.set('isFetching',true);
	}
	if (action.type == types.CATEGORY_DONE) {
		return state.set('isFetching',false);
	}
	if (action.type == types.CATEGORY_STATE) {
		
		return state.set('categories',fromJS(action.payload));
	}
	if (action.type == types.CATEGORYLIST_STATE) {
		return state.merge({
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			current:action.payload.current,
			categories:fromJS(action.payload.list)
		});
	}
	return state;
};