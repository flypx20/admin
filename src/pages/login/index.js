import React,{ Component } from 'react';


//引入css
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const axios = require('axios');



class Login extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:3000/admin/login',
          data: values
        })
        .then((result)=>{
          console.log(result);
        })
        .catch((err)=>{
          console.log(err);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' },{ pattern: /^[a-zA-Z0-9_-]{4,16}$/,message:'4到16位（字母，数字，下划线，减号)'}],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' },{ pattern:/^[a-zA-Z0-9]{4,10}$/,message:'密码不能含有非法字符，长度在4-10之间' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick = {this.handleSubmit} className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}



const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;