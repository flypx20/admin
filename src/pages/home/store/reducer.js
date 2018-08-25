import * as types from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	userCount:10,
	goodsCount:11,
	catesCount:12
});
export default (state=defaultItem,action)=>{
	if (action.type == types.ADMIN_REQUEST) {
		return state.merge({
			userCount:action.payload.userCount,
			goodsCount:action.payload.goodsCount,
			catesCount:action.payload.catesCount
		});
	}
	return state;
};