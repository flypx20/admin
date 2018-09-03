import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreator from './store/actions.js';
import { InputNumber,Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,TreeSelect } from 'antd';
  
import CategorySelector from './category-selector.js';

import PicturesWall from 'common/uploadImage';
import RichEditor from 'common/rich-deitor';

import {PRODUCT_UPLOADIMAGE,PRODUCT_UPLOADETAILIMAGE} from 'api';
import './detail.css';

const FormItem = Form.Item;
const Option = Select.Option;

class ProductDetail extends Component{
	
	constructor(props){
		super(props);
			this.state = {
				productId:this.props.match.params.id
			};
	}
 	componentDidMount(){
		this.props.handleEdit(this.state.productId);
	}
	render(){
		let fileList = '';
		if (this.props.imageList) {
			fileList = this.props.imageList.split(',').map((path,index)=>{
				return (
						<li key={index}>
							<img src={path} />
						</li>
					)
			});
		}
		return (
			<MyLayout>
			<Breadcrumb>
			    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
			    <Breadcrumb.Item>商品详情</Breadcrumb.Item>
  			</Breadcrumb>
  			<Form>
				<FormItem
					label="商品名称"
				>
				
					<Input 
						defaultValue={this.props.EditName}	
						disabled = {true}
					/>

				</FormItem>
				<FormItem
					label="商品描述"
				>
				
					<Input
						defaultValue={this.props.EditIntro}	
						disabled = {true}
					 />
				</FormItem>
				<FormItem
					label="商品分类"
				>
					<CategorySelector
						ParentCategoryId= {this.props.ParentCategoryId}
						categoryId={this.props.categoryId}
						disable={true}
					 />				
				</FormItem>
				<FormItem
					label="商品价格"
				>
					<InputNumber
					value={this.props.EditPrice}	
					disabled = {true}				

					formatter={value => `${value}元`}
				 />
				</FormItem>
				<FormItem
					label="商品库存"
				>
					<InputNumber
				 	value={this.props.EditNum}	
					disabled = {true}	
					formatter={value => `${value}件`}
				 />								
				</FormItem>
				<FormItem
					label="商品图片"
				>		
					<url className='detail'>
						{fileList}
					</url>
				</FormItem>
				<FormItem
					label="商品详情"
				>
					<div dangerouslySetInnerHTML = {{__html:this.props.detail}}></div>
				</FormItem>

			</Form>
			</MyLayout>
		)
	}
	
}
const mapProductStateToProps = (state)=>{
  return {
    isLoading:state.get('productState').get('isLoading'),
    detail:state.get('productState').get('detail'),
    ParentCategoryId:state.get('productState').get('ParentCategoryId'),
    categoryId:state.get('productState').get('categoryId'),
    EditName:state.get('productState').get('EditName'),
	EditNum:state.get('productState').get('EditNum'),
	EditPrice:state.get('productState').get('EditPrice'),
	EditIntro:state.get('productState').get('EditIntro'),
	imageList:state.get('productState').get('imageList')
  }
}
const mapProductActionsToProps = (dispatch)=>{
    return {
    	handleEdit:(productId)=>{
      		const action = actionCreator.getEditAction(productId);
        	dispatch(action);       		
      	}
  }
}

const WrappedRegistrationForm = Form.create()(ProductDetail);

export default connect(mapProductStateToProps,mapProductActionsToProps)(WrappedRegistrationForm);