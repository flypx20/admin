import React,{ Component } from 'react';
import Login from './pages/login/';
import Home from './pages/home/';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { getUsername } from 'util';
//引入css
import './style.css';


class App extends Component{
	render(){
			const ProtectedRoute = ({component:Component,...rest})=>(
				<Route 
					{...rest}
					render = {props=>(
							getUsername() 
							?(<Component {...props} />)
							:(<Redirect to={{
								pathname:'/login'
							}} />)
						)

					}
				 />
		)
			const LoginRoute = ({component:Component,...rest})=>{
				if (getUsername()) {
					return <Redirect to={{
								pathname:'/'
							}} />
				}else{
					return <Route {...rest} component={Component}/>
				}
			}
		//return 只能返回一个
		return(<div className = 'login'>
				<Router>
				    <div>
				    	<ProtectedRoute exact path = '/' component={ Home }/>
				      <LoginRoute path="/login" component={ Login }/>
				    </div>
				</Router>
				
				</div>)
	}
}
export default App;