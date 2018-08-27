import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,TreeSelect } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class CategoryAdd extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	 handleSubmit(e){
	
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
				{getFieldDecorator('category', {
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
						<Option value="1">一级分类</Option>
					</Select>
				)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">Register</Button>
				</FormItem>
			</Form>
    </MyLayout>
    )
  }
}
const WrappedRegistrationForm = Form.create()(CategoryAdd);
export default connect()(WrappedRegistrationForm);