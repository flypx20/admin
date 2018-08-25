import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import React,{ Component } from 'react';
import Header from 'common/header';
import Sider from 'common/sider';

const { SubMenu } = Menu;
const { Content } = Layout;


class MyLayout extends Component{
  render(){
    //return 只能返回一个
    return(
      <Layout>
        <Layout>
          <Header />
        </Layout>
        <Layout>
          <Sider />
          
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 600 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>

    );
  }
}
export default MyLayout;
  