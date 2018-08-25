import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button  } from 'antd';

import React,{ Component } from 'react';
import './index.css';
import {getUsername,removeUsername, request} from 'util';
import {LOGOUT} from 'api';


const { SubMenu } = Menu;
const { Header } = Layout;




class myHeader extends Component{
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    request({
      url:LOGOUT
    })
    .then((result)=>{
      removeUsername();
      window.location.href = '/login';
    });

  }
  render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick = {this.handleLogout}><Icon type="logout" />  退出</a>
        </Menu.Item>
      </Menu>
    );
    //return 只能返回一个
    return(

      <Header className="header">
        <div className="logo"> 飞猪飞 </div>
        <div className='logout'>
          <Dropdown overlay={menu} placement="bottomCenter">
              <Button>{getUsername()}</Button>
          </Dropdown>
        </div>

      </Header>
    );
  }
}
export default myHeader;
  