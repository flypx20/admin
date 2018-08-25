import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import React,{ Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Alert } from 'antd';
import { Link } from 'react-router-dom';




class ErrorPage extends Component{
  render(){
    //return 只能返回一个
    return(

        <div style={{ width:'300px',margin:'50px auto' }}>
          <Alert message="您请求的页面不存在" type="error" />
          <Link to='/'>返回首页</Link>
        </div>

    );
  }
}
export default ErrorPage;
