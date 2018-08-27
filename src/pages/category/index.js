import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import CategoryList from './list.js';
import CategoryAdd from './add.js';

import { Route,Switch} from 'react-router-dom';
class Category extends Component{
	render(){
		//return 只能返回一个
		return(
			  <Switch>
          <Route exact path='/category' component={ CategoryList }/>
          <Route path='/category/add' component={ CategoryAdd }/>
        </Switch>  
    )
  }
}


export default connect()(Category);