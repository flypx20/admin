import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb,Button,Table,Divider,Input,InputNumber,Switch, Icon  } from 'antd';
import * as actionCreator from './store/actions.js';

const { Column, ColumnGroup } = Table;

const Search = Input.Search;

class OrderList extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.handleOrderList(1);
  }
  render(){
    const {keyword }= this.props;
    const columns = [{
      title: '购买用户',
      dataIndex: 'user',
      key: 'user'
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render:(orderNo)=>{
        if (keyword) {
          let reg = new RegExp("("+keyword+")",'ig');
          let html = orderNo.replace(reg,'<b style="color:red">$1</b>')
          return <span dangerouslySetInnerHTML={{__html:html}}></span>          
        }else{
          return orderNo;
        }

      }      
    },
     {
      title: '订单价格',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: '订单状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc'
    },
     
    {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
         <Divider type="vertical" />
         <Link to={"/order/detail/"+record.orderNo} >查看</Link>           
      </span>
   ),
}];
    const data = this.props.list.map((orders)=>{
      return {
        key:orders.get('_id'),
        orderNo:orders.get('orderNo'),
        user:orders.get('shipping').get('name'),
        payment:orders.get('payment'),
        statusDesc:orders.get('statusDesc'),

      }
    }).toJS();
    //return 只能返回一个
    return(
      <MyLayout>
        <Breadcrumb>
          <Breadcrumb.Item>订单管理</Breadcrumb.Item>
          <Breadcrumb.Item>订单列表</Breadcrumb.Item>
        </Breadcrumb>
      <div className="clearfix" style={{marginTop:'10px' }}>
        <Search
          placeholder="input search text"
          onSearch={value => this.props.handleSearch(value,1)}
          style={{ width: 200 }}
          enterButton
        />
    </div>        
    <Table
       columns={columns} 
       dataSource={data}
       pagination={
        {
          position:'bottom',
          defaultCurrent:this.props.current,
          pageSize:this.props.pageSize,
          total:this.props.total
         
        }

       }
        onChange={(pagination)=>{
          if (keyword) {
            this.props.handleSearch(keyword,pagination.current);
          }else{
            this.props.handleOrderList(pagination.current);
          }
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
const mapProductListStateToProps = (state)=>{
  return {
    isFetching:state.get('orderState').get('isFetching'),
    pageSize:state.get('orderState').get('pageSize'),
    total:state.get('orderState').get('total'),
    current:state.get('orderState').get('current'),
    list:state.get('orderState').get('list'),
    keyword:state.get('orderState').get('keyword')
  }
}
const mapProductListActionsToProps = (dispatch)=>{
    return {
      handleOrderList:(page)=>{
        const action = actionCreator.getPageAction(page);
        dispatch(action);
      },
      handleSearch:(keyword,page)=>{
        const action = actionCreator.setSearchAction(keyword,page);
        dispatch(action);
      }      
  }
}
export default connect(mapProductListStateToProps,mapProductListActionsToProps)(OrderList);