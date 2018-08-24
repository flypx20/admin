import React,{ Component } from 'react';
import { getUsername } from 'util';
class Home extends Component{
	render(){
		//return 只能返回一个
		return(<div className = 'login'>
					{ getUsername() }
				</div>)
	}
}
export default Home;