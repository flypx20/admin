import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			method: options.method || 'get',
      		url: options.url || '',
      		withCredentials: true,
		};
		if (params.method.toUpperCase()=='GET') {
			params.params = options.data;
		}else {
			params.data = options.data;
		}
		axios(params)
		.then(result=>{
			let data = result.data;
			if (data.code == 0) {
				resolve(data);
			}else if (data.code == 10) {
				removeUsername();
				window.location.href = '/login';
			}
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