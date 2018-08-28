import * as User from './actionType.js';
import { message } from 'antd';
import { CATEGORY_ADD } from 'api';
import { request } from 'util';

export const categoryRequest = ()=>{
	return {
			type:User.CATEGORY_REQUEST,
		};
};
export const categoryDone = ()=>{
	return {
			type:User.CATEGORY_DONE,
		};
};
export const categoryList = (result)=>{
  return {
      type:User.CATEGORY_STATE,
      payload:result
    };
};
export const categoryListState = (result)=>{
  return {
      type:User.CATEGORYLIST_STATE,
      payload:result
    };
};

export const getCategoryData = (values)=>{
	return (dispatch)=>{
		const action = categoryRequest();
    dispatch(action);
		request({
          method:'post',
          url: CATEGORY_ADD,
          data:values
        })
        .then((result)=>{
         
          if (result.code == 0) {
            message.success(result.message);
            if (result.data) {
               const action = categoryList(result.data);
              dispatch(action);
            }
           
          }else if (result.code == 1) {
            message.error(result.message);
          }
           const action = categoryDone();
         dispatch(action);
        })
        .catch((err)=>{
            const action = categoryDone();
         dispatch(action);
        });
	};
	
};
export const getLeveoneCates = ()=>{
  return (dispatch)=>{
    request({
          url: CATEGORY_ADD,
          data:{
            pid:0
          }
        })
        .then((result)=>{
           const action = categoryList(result.data);
            dispatch(action);
          if (result.code == 0) {
            console.log(result);
           
          }else if (result.code == 1) {
            message.error(result.message);
            
          }
        })
        .catch((err)=>{
            const action = categoryDone();
         dispatch(action);
        });
  };
  
};
export const getCategoryListData = (pid,page)=>{
  
  return (dispatch)=>{
    const action = categoryRequest();
  dispatch(action);
    request({
          url: CATEGORY_ADD,
          data:{
            pid:pid,
            page:page
          }
        })
        .then((result)=>{
           const action = categoryDone();
            dispatch(action);
          if (result.code == 0) {
            console.log(result.data);
            dispatch(categoryListState(result.data));
          }else if (result.code == 1) {
            message.error(result.message);
            
          }
        })
        .catch((err)=>{
            const action = categoryDone();
         dispatch(action);
        });
  };
  
};