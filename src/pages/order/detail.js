import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreator from './store/actions.js';
import { InputNumber,Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,TreeSelect } from 'antd';
  
import './detail.css';

const FormItem = Form.Item;

class OrderDetail extends Component{
	
	constructor(props){
		super(props);
			this.state = {
				orderNo:this.props.match.params.id
			};
	}
 	componentDidMount(){
		// this.props.handleEdit(this.state.productId);
	}
	render(){
		return (
			<MyLayout>
			<Breadcrumb>
			    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
			    <Breadcrumb.Item>订单详情</Breadcrumb.Item>
  			</Breadcrumb>

		  		<div class="order-detail">
					<div class="container clearfix">
						<div class="side-content">

							<ul class="product-title clearfix">
								<li class="product-info">商品信息</li>
								<li class="product-price">单价</li>
								<li class="product-count">数量</li>
								<li class="product-totalPrice">小计</li>
							</ul>
							<ul class="order-title clearfix">
								<li class="order-no">
									<span class="lable">订单号:</span>
									<span class="text">{this.state.orderNo}</span>
								</li>
								<li class="order-created-time">
									<span class="lable">创建时间:</span>
									<span class="text">{this.props.createdTime}</span>
								</li>
								<li class="order-shipping-name">
									<span class="lable">收件人:</span>
									<span class="text">{this.props.shipping.name}({this.props.shipping.phone})</span>
								</li>
								<li class="order-shipping-address">
									<span class="lable">收货地址:</span>
									<span class="text">{this.props.shipping.province} {this.props.shipping.city} {this.props.shipping.address} (邮编:{this.props.shipping.zip})</span>
								</li>
								<li class="order-status-desc">
									<span class="lable">订单状态:</span>
									<span class="text">{this.props.statusDesc}</span>
								</li>
								<li class="order-payment">
									<span class="lable">订单金额:</span>
									<span class="text">￥ {this.props.payment}</span>
								</li>
								<li class="order-paymentTypeDesc">
									<span class="lable">支付方式:</span>
									<span class="text">{this.props.paymentTypeDesc}</span>
								</li>
								<li class="order-detail">
									this.props.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</MyLayout>
		)
	}
	
}
const mapProductStateToProps = (state)=>{
  return {
    productList:state.get('orderState').get('productList'),
    shipping:state.get('orderState').get('shipping'),
    createdTime:state.get('orderState').get('createdTime'),
	statusDesc:state.get('orderState').get('statusDesc'),
	payment:state.get('orderState').get('payment'),
	paymentTypeDesc:state.get('productState').get('paymentTypeDesc')
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

const WrappedRegistrationForm = Form.create()(OrderDetail);

export default connect(mapProductStateToProps,mapProductActionsToProps)(WrappedRegistrationForm);