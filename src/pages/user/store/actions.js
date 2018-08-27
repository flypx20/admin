import * as User from './actionType.js';
import { message } from 'antd';
import { USER } from 'api';
import { request } from 'util';

export const userRequest = ()=>{
	return {
			type:User.USER_REQUEST,
		};
};
export const userDone = ()=>{
	return {
			type:User.USER_DONE,
		};
};
export const userList = (val)=>{
  return {
      type:User.USER_STATE,
      payload:val
    };
};

export const getUserData = (page)=>{
	return (dispatch)=>{
	/*	const action = userRequest();
        dispatch(action);*/
		request({
          url: USER,
          data:{
            page:page
          }
        })
        .then((result)=>{
          const action = userDone();
         dispatch(action);
          if (result.code == 0) {
        const action = userList(result);
         dispatch(action);
          }else if (result.code == 10) {
            message.error(result.message);
            
          }
        })
        .catch((err)=>{
            const action = userDone();
         dispatch(action);
        });
	};
	
};