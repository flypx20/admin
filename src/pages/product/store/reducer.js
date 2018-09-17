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
	current:1,
	isFetching:false,
	list:[],
	EditName:'',
	EditNum:'',
	EditPrice:'',
	EditIntro:'',
	keyword:'',
	imageValidateStatus:'',
	imageHelp:''

});
export default (state=defaultItem,action)=>{
	if (action.type == types.PRODUCT_REQUEST) {
		return state.set('isLoading',true);
	}
	if (action.type == types.PRODUCT_DONE) {
		return state.set('isLoading',false);
	}
	if (action.type == types.PRODUCTLIST_REQUEST) {
		return state.set('isFetching',true);
	}
	if (action.type == types.PRODUCTLIST_DONE) {
		return state.set('isFetching',false);
	}
	if (action.type == types.PRODUCT_DETAIL) {
		
		return state.set('detail',action.payload);
	}
	if (action.type == types.PRODUCT_SETCATEGORYID) {
		
		return state.merge({
			validateStatus:'',
			help:'',
			ParentCategoryId:action.payload.ParentCategoryId,
			categoryId:action.payload.categoryId
		});
	}
	if (action.type == types.PRODUCT_IMAGE) {
		
		return state.merge({
			'imageList':action.payload,
			imageValidateStatus:'',
			imageHelp:'',			
		});
	}

	if (action.type == types.PRODUCT_CATENULL) {
		
		return state.merge({

			validateStatus:'error',
			help:'分类必须选择'
		});
	}
	if (action.type == types.PRODUCT_IMAGENULL) {
		
		return state.merge({
			imageValidateStatus:'error',
			imageHelp:'请添加商品图片',
		});
	}	
	if (action.type == types.PRODUCT_LISTSTATE) {
		
		return state.merge({
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			current:action.payload.current,
			list:action.payload.list,
			keyword:action.payload.keyword
		});
	}
	if (action.type == types.PRODUCT_INITIALTATE) {
		return state.merge({
			ParentCategoryId:action.payload.category.pid,
			categoryId:action.payload.category._id,
			EditName:action.payload.productName,
			EditNum:action.payload.productNum,
			EditPrice:action.payload.productPrice,
			EditIntro:action.payload.productIntro,
			imageList:action.payload.imageList,
			detail:action.payload.detail
		});
	}
	return state;
};