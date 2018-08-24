import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method: options.method || 'get',
      url: options.url || '',
      data: options.data || null
		})
		.then(result=>{
			let data = result.data;
			resolve(data);
		})
		.catch(err=>{
			reject(err);
		});
	});
};
export const setUsername = (username)=>{
	window.localStorage.setItem('username',username);
};
export const getUsername = ()=>{
	var storage=window.localStorage;
	return storage.getItem('username');
};
export const removeUsername = ()=>{
	var storage=window.localStorage;
	storage.removeItem('username');
};