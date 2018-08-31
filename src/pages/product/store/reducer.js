import * as types from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	isLoading:false,
	detail:'',
	ParentCategoryId:'',
	categoryId:'',
	imageList:'',
	validateStatus:'',
	help:'',
	pageSize:5,
	total:50,
	current:1
});
export default (state=defaultItem,action)=>{
	if (action.type == types.PRODUCT_REQUEST) {
		return state.set('isLoading',true);
	}
	if (action.type == types.PRODUCT_DONE) {
		return state.set('isLoading',false);
	}
	if (action.type == types.PRODUCT_DETAIL) {
		
		return state.set('detail',action.payload);
	}
	if (action.type == types.PRODUCT_SETCATEGORYID) {
		
		return state.merge({
			'ParentCategoryId':action.payload.ParentCategoryId,
			categoryId:action.payload.categoryId,
			validateStatus:'',
			help:''
		});
	}
	if (action.type == types.PRODUCT_IMAGE) {
		
		return state.set('imageList',action.payload);
	}

	if (action.type == types.PRODUCT_CATENULL) {
		
		return state.merge({
			validateStatus:'error',
			help:'分类必须选择'
		});
	}
	
	return state;
};