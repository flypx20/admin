import * as todoList from './actionType.js';
import axios from 'axios';

export const changeAction = (payload)=>{
	return {
			type:todoList.CHANGE,
			payload
		};
};
export const addAction = ()=>{
	return {
			type:todoList.ADD
		};
};
export const deleteAction = (payload)=>{
	return {
			type:todoList.DELETE,
			payload
		};
};
export const loadateAction = (payload)=>{
	return {
			type:todoList.LOADATE,
			payload
		};
};
export const getInitData = ()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000')
		.then((data)=>{
			const action = loadateAction(data.data);
			dispatch(action);
		})
		.catch((e)=>{
			console.log('err:::',e);
		});
	};
	
};