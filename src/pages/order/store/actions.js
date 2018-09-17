import * as User from './actionType.js';
import { message } from 'antd';
import { ORDER,ORDER_SEARCH } from 'api';
import { request } from 'util';

export const orderRequest = ()=>{
	return {
		type:User.ORDER_REQUEST,
	};
};
export const orderDone = ()=>{
	return {
		type:User.ORDER_DONE,
	};
};
export const getDetailAction = (value)=>{
  return {
    type:User.ORDER_DETAIL,
    payload:value
  };
};
export const getCategoryIdAction = (pid,id)=>{
  return {
    type:User.ORDER_SETCATEGORYID,
    payload:{
      ParentCategoryId:pid,
      categoryId:id
    }
  };
};
export const getImageListAction = (filepath)=>{
  return {
    type:User.ORDER_IMAGE,
    payload:filepath
  };
};
export const orderListRequest = ()=>{
  return {
      type:User.ORDERLIST_REQUEST,
    };
};
export const orderListDone = ()=>{
  return {
      type:User.ORDERLIST_DONE,
    };
};
export const orderListState = (value)=>{
  return {
      type:User.ORDER_LISTSTATE,
      payload:value
    };
};


export const getPageAction = (page)=>{
  
  return (dispatch)=>{
    const action = orderListRequest();
  dispatch(action);
    request({
      url: ORDER,
      data:{
        page:page
      }
    })
    .then((result)=>{
       const action = orderListDone();
        dispatch(action);
      if (result.code == 0) {
        dispatch(orderListState(result.data));
      }else if (result.code == 1) {
        message.error(result.message);
        
      }
    })
    .catch((err)=>{
        const action = orderListDone();
     dispatch(action);
    });
  };
  
};

export const setSearchAction = (keyword,page)=>{
  
  return (dispatch)=>{
    const action = orderListRequest();
  dispatch(action);
    request({
      url: ORDER_SEARCH,
      data:{
        keyword:keyword,
        page:page
      }
    })
    .then((result)=>{
       const action = orderListDone();
        dispatch(action);
      if (result.code == 0) {
        dispatch(orderListState(result.data));
      }else if (result.code == 1) {
        message.error(result.message);
        
      }
    })
    .catch((err)=>{
        const action = orderListDone();
     dispatch(action);
    });
  };
  
};

