import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { Table, Divider, Tag, Spin } from 'antd';
import { connect } from 'react-redux';
import * as actionCreator from './store/actions.js';

const { Column, ColumnGroup } = Table;

const columns = [{
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '管理员身份',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render:isAdmin=>( isAdmin ? '是' : '否')
        
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    }];

class User extends Component{
  componentDidMount(){
    this.props.handleUserList(1);
  }
	render(){
		const data = this.props.list.map((user)=>{
      return {
        key:user.get('_id'),
        userName:user.get('username'),
        isAdmin:user.get('isAdmin'),
        email:user.get('email'),
        phone:user.get('phone')
      };
    }).toJS();
    console.log(data);
    // const data = [];
    
		//return 只能返回一个
		return(
      <MyLayout>
			<Table
       columns={columns} 
       dataSource={data}
       pagination={
        {
          position:'bottom',
          current:this.props.current,
          defaultCurrent:this.props.current,
          pageSize:this.props.pageSize,
          total:this.props.total,
         
        }

       }
        onChange={(pagination)=>{
          this.props.handleUserList(pagination.current);
        }}
        loading={
            {
            spinning:this.props.isFetching,
            tip:'正在请求数据' 
          }
        }
        />
    </MyLayout>
    )
  }
}

const mapUserStateToProps = (state)=>{
  return {
    isFetching:state.get('userState').get('isFetching'),
    pageSize:state.get('userState').get('pageSize'),
    total:state.get('userState').get('total'),
    current:state.get('userState').get('current'),
    list:state.get('userState').get('list')
  }
}
const mapUserActionsToProps = (dispatch)=>{
    return {
      handleUserList:(page)=>{
        const action = actionCreator.getUserData(page);
        dispatch(action);
      }
  }
}
export default connect(mapUserStateToProps,mapUserActionsToProps)(User);