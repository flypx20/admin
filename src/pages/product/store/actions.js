import * as User from './actionType.js';
import { message } from 'antd';
import { PRODUCT_ADD,PRODUCT_ORDER,PRODUCT_STATUS,PRODUCT_EDIT,PRODUCT_SEARCH } from 'api';
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
export const productListRequest = ()=>{
  return {
      type:User.PRODUCTLIST_REQUEST,
    };
};
export const productListDone = ()=>{
  return {
      type:User.PRODUCTLIST_DONE,
    };
};
export const productListState = (value)=>{
  return {
      type:User.PRODUCT_LISTSTATE,
      payload:value
    };
};



export const getSetProductAction = (err, values)=>{
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
      let method ='';
      if (values.id) {
        method = 'put';
      }else{
        method = 'post';
      }
		const action = productRequest();
    dispatch(action);
		request({
      method:method,
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
        window.location.href = '/product';
        message.success(result.message);
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

export const getPageAction = (page)=>{
  
  return (dispatch)=>{
    const action = productListRequest();
  dispatch(action);
    request({
      url: PRODUCT_ADD,
      data:{
        page:page
      }
    })
    .then((result)=>{
       const action = productListDone();
        dispatch(action);
      if (result.code == 0) {
        dispatch(productListState(result.data));
      }else if (result.code == 1) {
        message.error(result.message);
        
      }
    })
    .catch((err)=>{
        const action = productListDone();
     dispatch(action);
    });
  };
  
};

export const setOrder = (id,val)=>{
  return (dispatch,getState)=>{
    const state = getState().get('productState');
    request({
      url: PRODUCT_ORDER,
      data:{
        id:id,
        order:val,
        page:state.get('current')
      }
    })
    .then((result)=>{
     
      if (result.code == 0) {
        message.success(result.message);
        dispatch(productListState(result.data));
       
      }else if (result.code == 1) {
        message.error(result.message);
      }
    })
    .catch((err)=>{
      message.error('设置排序失败');
    });
  };
  
};
export const setStatus = (id,newStatus)=>{
  return (dispatch,getState)=>{
    const state = getState().get('productState');
    request({
      url: PRODUCT_STATUS,
      data:{
        id:id,
        status:newStatus,
        page:state.get('current')
      }
    })
    .then((result)=>{
        dispatch(productListState(result.data));
      if (result.code == 0) {
        message.success(result.message);
       
      }else if (result.code == 1) {
        message.error(result.message);
      }
    })
    .catch((err)=>{
      message.error('设置状态失败');
    });
  };
  
};
export const setInitialData = (payload)=>{
  return {
    type:User.PRODUCT_INITIALTATE,
    payload
  }
}
export const getEditAction = (id)=>{
  return (dispatch)=>{
    request({
      url: PRODUCT_EDIT,
      data:{
        id:id
      }
    })
    .then((result)=>{
      if (result.code == 0) {
        message.success(result.message);
        dispatch(setInitialData(result.data));
      }else if (result.code == 1) {
        message.error(result.message);
      }
    })
    .catch((err)=>{
      console.log(err);
      message.error('获取信息失败');
    });
  };
  
};
export const setSearchAction = (keyword,page)=>{
  
  return (dispatch)=>{
    const action = productListRequest();
  dispatch(action);
    request({
      url: PRODUCT_SEARCH,
      data:{
        keyword:keyword,
        page:page
      }
    })
    .then((result)=>{
       const action = productListDone();
        dispatch(action);
      if (result.code == 0) {
        dispatch(productListState(result.data));
      }else if (result.code == 1) {
        message.error(result.message);
        
      }
    })
    .catch((err)=>{
        const action = productListDone();
     dispatch(action);
    });
  };
  
};
