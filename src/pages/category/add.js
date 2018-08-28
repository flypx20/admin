import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,TreeSelect } from 'antd';
import * as actionCreator from './store/actions.js';
const FormItem = Form.Item;
const Option = Select.Option;

class CategoryAdd extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.handleLeveoneCates();

	}
	 handleSubmit(e){
	
	
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleCategoryAdd(values);
      }
    });
 }
	render(){
		const { getFieldDecorator } = this.props.form;

		//return 只能返回一个
		return(
      <MyLayout>
			<Breadcrumb>
			    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
			    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
  			</Breadcrumb>
  			<Form onSubmit={this.handleSubmit}>
				<FormItem
					label="分类名称"
				>
				{getFieldDecorator('name', {
					rules: [{
						required: true, message: '请输入分类名称',
					}],
				})(
					<Input />

				)}
				</FormItem>
				<FormItem
					label="分类名称"
				>
				{getFieldDecorator('pid', {
					rules: [{
						required: true, message: '请选择分类',
					}],
				})(
					<Select initialValue="lucy" style={{ width: 120 }}>
						<Option value="0">根分类</Option>
						{this.props.categories.map((list)=>{
							return <Option key={list.get('_id')} value={list.get('_id')}>根分类/{list.get('name')}</Option>
						})}
					</Select>
				)}
				</FormItem>
				<FormItem>
					<Button
					 type="primary"
					 onClick = {this.handleSubmit}
					 loading = {
					 	this.props.isFetching
					 }
					 >提交</Button>
				</FormItem>
			</Form>
    </MyLayout>
    )
  }
}

const mapCategoryStateToProps = (state)=>{
  return {
    isFetching:state.get('categoryState').get('isFetching'),
    categories:state.get('categoryState').get('categories')
  }
}
const mapCategoryActionsToProps = (dispatch)=>{
    return {
      handleCategoryAdd:(values)=>{
        const action = actionCreator.getCategoryData(values);
        dispatch(action);
      },
      handleLeveoneCates:()=>{
      	const action = actionCreator.getLeveoneCates();
        dispatch(action);
      }
  }
}


const WrappedRegistrationForm = Form.create()(CategoryAdd);
export default connect(mapCategoryStateToProps,mapCategoryActionsToProps)(WrappedRegistrationForm);