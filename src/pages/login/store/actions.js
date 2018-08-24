import * as Login from './actionType.js';
import { message } from 'antd';
import { LOGIN } from 'api';
import { request,setUsername } from 'util';

export const loginRequest = ()=>{
	return {
			type:Login.LOGIN_REQUEST,
		};
};
export const loginError = ()=>{
	return {
			type:Login.LOGIN_ERROR
		};
};


export const getLoginData = (values)=>{
	return (dispatch)=>{
		const action = loginRequest();
        dispatch(action);
		request({
          method: 'post',
          url: LOGIN,
          data: values
        })
        .then((result)=>{
        	 const action = loginError();
         dispatch(action);
          if (result.code == 0) {
            setUsername(result.data.username);
            window.location.href = '/';
          }else if (result.code == 10) {
            message.error(result.message);
            
          }
        })
        .catch((err)=>{
          console.log(err);
           const action = loginError();
         dispatch(action);
        });
	};
	
};