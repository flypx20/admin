import React,{ Component } from 'react';
import Login from './pages/login/';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


//引入css
import './style.css';


class App extends Component{
	render(){
		//return 只能返回一个
		return(<div className = 'login'>
				<Router>
				    <div>
				      <Route path="/" component={Login}/>
				    </div>
				</Router>
				
				</div>)
	}
}
export default App;