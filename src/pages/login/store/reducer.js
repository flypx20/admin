import * as todoList from './actionType.js';
const { fromJS } = require('immutable');


const defaultItem = fromJS({
	value:'hello!!!',
	list:['aaa!!','bbb!!']
});
export default (state=defaultItem,action)=>{
	if (action.type == todoList.CHANGE) {
		/*const newState = JSON.parse(JSON.stringify(state));
		const newState = state.get('value');
		newState.value = action.payload;*/

		return state.set('value',action.payload);
	}
	if (action.type == todoList.LOADATE) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState;*/
		return state.set('list',action.payload);
	}
	if (action.type == todoList.ADD) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.value);
		newState.value = '';
		return newState;*/
		const newList = [...state.get('list'),state.get('value')];
		//set 只能设置一个属性，merge能设置多个属性
		return  state.merge({
			list:newList,
			value:''
		});
	}
	if (action.type == todoList.DELETE) {
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState;*/
		const newList = [...state.get('list')];
		newList.splice(action.payload,1);
		return state.set('list',newList);
	}
	return state;
};