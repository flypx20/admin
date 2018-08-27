import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CategoryList extends Component{
	render(){
		//return 只能返回一个
		return(
      <MyLayout>
			 <Link to='/category/add'>add</Link>
    </MyLayout>
    )
  }
}

export default connect()(CategoryList);