import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import ProductList from './list.js';
import ProductSave from './save.js';
import ProductDetail from './detail.js';


import { Route,Switch} from 'react-router-dom';
class Category extends Component{
	render(){
		//return 只能返回一个
		return(
			  <Switch>
        	<Route path='/product/detail/:id?' component={ ProductDetail }/>
          <Route path='/product/save/:id?' component={ ProductSave }/>
            <Route path='/product' component={ ProductList }/>
        </Switch>  
    )
  }
}


export default connect()(Category);