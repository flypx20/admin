import * as User from './actionType.js';
import { message } from 'antd';
import { PRODUCT_ADD } from 'api';
import { request } from 'util';

export const productRequest = ()=>{
	return {
			type:User.PRODUCT_REQUEST,
		};
};
export const productDone = ()=>{
	return {
			type:User.PRODUCT_DONE,
		};
};
export const getDetailAction = (value)=>{
  return {
      type:User.PRODUCT_DETAIL,
      payload:value
    };
};
export const getCategoryIdAction = (pid,id)=>{
  return {
      type:User.PRODUCT_SETCATEGORYID,
      payload:{
        ParentCategoryId:pid,
        categoryId:id
      }
    };
};
export const getImageListAction = (filepath)=>{
  return {
      type:User.PRODUCT_IMAGE,
      payload:filepath
    };
};

export const getSetProductAction = (err, values)=>{
  console.log(values);
	return (dispatch,getState)=>{
    const state = getState().get('productState');
    if (!state.get('categoryId')) {
      dispatch({
        type:User.PRODUCT_CATENULL
      });
      return;

    }
     if (err) {
        return;
      }
		const action = productRequest();
    dispatch(action);
		request({
          method:'post',
          url: PRODUCT_ADD,
          data:{
            ...values,
            category:state.get('categoryId'),
            imageList:state.get('imageList'),
            detail:state.get('detail')
          }
        })
        .then((result)=>{
         
          if (result.code == 0) {
            message.success(result.message);
            if (result.data) {
               
            }
           
          }else if (result.code == 1) {
            message.error(result.message);
          }
           const action = productDone();
            dispatch(action);
        })
        .catch((err)=>{
            const action = productDone();
            dispatch(action);
        });
	};
	
};




export const setOrder = (pid,id,val)=>{
  return (dispatch,getState)=>{
    const state = getState().get('categoryState');
    request({
          url: CATEGORY_ORDER,
          data:{
            id:id,
            order:val,
            pid:pid,
            page:state.get('current')
          }
        })
        .then((result)=>{
         
          if (result.code == 0) {
            message.success(result.message);
            dispatch(categoryListState(result.data));
           
          }else if (result.code == 1) {
            message.error(result.message);
          }
        })
        .catch((err)=>{
          message.error('设置排序失败');
        });
  };
  
};