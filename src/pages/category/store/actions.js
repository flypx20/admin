import * as User from './actionType.js';
import { message } from 'antd';
import { CATEGORY_ADD,CATEGORY_EDIT,CATEGORY_ORDER } from 'api';
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
export const getCategoryName = (id,name)=>{
  return (dispatch)=>{
    const action = {
      type:User.CATEGORY_NAME,
      payload:{
        id:id,
        name:name
      }
    };
    dispatch(action);
  };
  
};
export const cancelCategoryModal = ()=>{
  return (dispatch)=>{
    const action = {
      type:User.CATEGORY_CANCEL
    }
    dispatch(action);
  }
  
};

export const ChangeCategoryName = (payload)=>{
  return (dispatch)=>{
    const action = {
      type:User.CATEGORY_CHANGE,
      payload
    }
    dispatch(action);
  }
  
};
export const categoryEditRequest = ()=>{
  return {
      type:User.CATEGORY_EDIT_REQUEST,
    };
};
export const categoryEditDone = ()=>{
  return {
      type:User.CATEGORY_EDIT_DONE,
    };
};
export const categoryEdit = (payload)=>{
  return {
      type:User.CATEGORY_EDIT,
      payload
    };
};
export const setCatesName = (pid,page)=>{
  return (dispatch,getState)=>{
    const state = getState().get('categoryState');
    const action = categoryEditRequest();
    dispatch(action);
    request({
          url: CATEGORY_EDIT,
          data:{
            id:state.get('categoryId'),
            name:state.get('categoryName'),
            pid:pid,
            page:page
          }
        })
        .then((result)=>{
         
          if (result.code == 0) {
            message.success(result.message);
            dispatch(categoryListState(result.data));
              const action = {
               type:User.CATEGORY_CANCEL
            }
             dispatch(action);
           
          }else if (result.code == 1) {
            message.error(result.message);
          }
           const action = categoryEditDone();
         dispatch(action);
        })
        .catch((err)=>{
            const action = categoryEditDone();
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