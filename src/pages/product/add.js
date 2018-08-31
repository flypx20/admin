import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductSave extends Component{
	render(){
		return (
			<MyLayout>
			<Link to='/product'>save</Link>
			</MyLayout>
		)
	}

}
export default connect()(ProductSave);