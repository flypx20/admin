import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import * as actionCreator from './store/actions.js';

class Home extends Component{
	componentDidMount(){
		this.props.handleCount();
	}
	render(){
		//return 只能返回一个
		return(
			<MyLayout>
			 <div style={{  padding: '30px' }}>
			    <Row gutter={16}>
			      <Col span={8}>
			        <Card
			         title="用户数"
			         bordered={false}
			         hoverable='true'
			         bordered='true'>
			         {this.props.userCount}
			        </Card>
			      </Col>
			      <Col span={8}>
			        <Card
			         title="商品数" 
			         bordered={false} 
			         hoverable='true' 
			         bordered='true'>
			         {this.props.goodsCount}
			        </Card>
			      </Col>
			      <Col span={8}>
			        <Card
			         title="分类数" 
			         bordered={false}
			         hoverable='true' 
			         bordered='true'>
			         {this.props.catesCount}
			        </Card>
			      </Col>
			    </Row>
			  </div>
			</MyLayout>
		)
	}
}
const countStateToProps = (state)=>{
    return {
      userCount:state.get('homeState').get('userCount'),
      goodsCount:state.get('homeState').get('goodsCount'),
      catesCount:state.get('homeState').get('catesCount')
   }

}
const countActionsToProps = (dispatch)=>{
    return {
      handleCount:()=>{
        const action = actionCreator.getAdminCount();
        dispatch(action);
      }
  }
}

export default connect(countStateToProps,countActionsToProps)(Home);