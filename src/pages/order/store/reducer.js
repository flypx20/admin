import * as types from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	isLoading:false,
	detail:'',
	imageList:'',
	pageSize:5,
	total:50,
	current:1,
	isFetching:false,
	list:[],
	keyword:''

});
export default (state=defaultItem,action)=>{
	if (action.type == types.ORDER_REQUEST) {
		return state.set('isLoading',true);
	}
	if (action.type == types.ORDER_DONE) {
		return state.set('isLoading',false);
	}
	if (action.type == types.ORDERLIST_REQUEST) {
		return state.set('isFetching',true);
	}
	if (action.type == types.ORDERLIST_DONE) {
		return state.set('isFetching',false);
	}
	if (action.type == types.ORDER_DETAIL) {
		
		return state.set('detail',action.payload);
	}

	if (action.type == types.ORDER_LISTSTATE) {
		
		return state.merge({
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			current:action.payload.current,
			list:action.payload.list,
			keyword:action.payload.keyword
		});
	}
	return state;
};