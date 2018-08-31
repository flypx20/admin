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

const FormItem = Form.Item;
const Option = Select.Option;

class ProductList extends Component{
	
	
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	 handleSubmit(e){
	
	
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      
        this.props.handleAdd(err, values);
     
    });
 }
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<MyLayout>
			<Link to='/product/save'>list</Link>
			<Breadcrumb>
			    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
			    <Breadcrumb.Item>商品信息</Breadcrumb.Item>
  			</Breadcrumb>
  			<Form onSubmit={this.handleSubmit}>
				<FormItem
					label="商品名称"
				>
				{getFieldDecorator('productName', {
					rules: [{
						required: true, message: '请输入商品名称',
					}],
				})(
					<Input />

				)}
				</FormItem>
				<FormItem
					label="商品描述"
				>
				{getFieldDecorator('productIntro', {
					rules: [{
						required: true, message: '请输入商品描述',
					}],
				})(
					<Input />

				)}
				</FormItem>
				<FormItem
					label="商品分类"
					validateStatus={this.props.validateStatus}
					help={this.props.help}
				>
					<CategorySelector
						getCategories= {(pid,id)=>{
							this.props.handleCategoryId(pid,id);
						}}
					 />
				
				</FormItem>
				<FormItem
					label="商品价格"
				>
				{getFieldDecorator('productPrice', {
					rules: [{
						required: true, message: '请输入商品描述',
					}],
				})(
					<InputNumber
				 	min={1} max={10}
					formatter={value => `${value}元`}
      				parser={value => value.replace('元', '')}
				 />

				)}
				
			
				</FormItem>
				<FormItem
					label="商品库存"
				>
				{getFieldDecorator('productNum', {
					rules: [{
						required: true, message: '请输入商品描述',
					}],
				})(
					<InputNumber
				 	min={1} max={10}
					formatter={value => `${value}件`}
      				parser={value => value.replace('件', '')}
				 />

				)}
				
				
				</FormItem>
				<FormItem
					label="商品图片"
				>
				<PicturesWall
					action ={PRODUCT_UPLOADIMAGE}
					max = {3}
					getList = {(filepath)=>{
						this.props.handleImageList(filepath);
					}}
				 />
					
				</FormItem>
				<FormItem
					label="商品信息"
				>
					<RichEditor
						action = {PRODUCT_UPLOADETAILIMAGE}
						getEditorValue = {(value)=>{
							this.props.handleDedail(value);
						}}
					/>
				</FormItem>
				<FormItem>
					<Button
					 type="primary"
					 loading = {
					 	this.props.isLoading
					 }
					 onClick = {this.handleSubmit}
					 
					 >提交</Button>
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
    validateStatus:state.get('productState').get('validateStatus'),
    help:state.get('productState').get('help')
  }
}
const mapProductActionsToProps = (dispatch)=>{
    return {
    	handleDedail:(value)=>{
    		const action = actionCreator.getDetailAction(value);
        	dispatch(action);
    	},
    	handleCategoryId:(ParentCategoryId,categoryId)=>{
    		const action = actionCreator.getCategoryIdAction(ParentCategoryId,categoryId);
        	dispatch(action);
    	},
    	handleImageList:(filepath)=>{
     		const action = actionCreator.getImageListAction(filepath);
        	dispatch(action);   		
    	},
      	handleAdd:(err, values)=>{
      		const action = actionCreator.getSetProductAction(err, values);
        	dispatch(action); 
      	}
  }
}

const WrappedRegistrationForm = Form.create()(ProductList);

export default connect(mapProductStateToProps,mapProductActionsToProps)(WrappedRegistrationForm);