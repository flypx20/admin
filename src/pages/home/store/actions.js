import * as types from './actionType.js';
import { message } from 'antd';
import { ADMIN } from 'api';
import { request,setUsername } from 'util';

export const adminRequest = (val)=>{
	return {
			type:types.ADMIN_REQUEST,
      payload:val
		};
};


export const getAdminCount = ()=>{
	return (dispatch)=>{
		
		request({
          url: ADMIN
        })
        .then((result)=>{
          if (result.code == 0) {
            const action = adminRequest(result);
            dispatch(action);
          }else if (result.code == 10) {
            message.error(result.message);
            
          }
        })
        .catch((err)=>{
          console.log(err);
        });
	};
	
};