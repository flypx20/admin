import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import ProductList from './list.js';
import ProductSave from './add.js';

import { Route,Switch} from 'react-router-dom';
class Product extends Component{
	render(){
		//return 只能返回一个
		return(
			  <Switch>
        
          <Route path='/product/save' component={ ProductSave }/>
            <Route path='/product' component={ ProductList }/>
        </Switch>  
    )
  }
}


export default connect()(Product);