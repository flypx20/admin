import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import OrderList from './list.js';
import OrderDetail from './detail.js';


import { Route,Switch} from 'react-router-dom';
class Category extends Component{
	render(){
		//return 只能返回一个
		return(
			  <Switch>
        	<Route path='/order/detail/:id?' component={ OrderDetail }/>
            <Route path='/order' component={ OrderList }/>
        </Switch>  
    )
  }
}


export default connect()(Category);