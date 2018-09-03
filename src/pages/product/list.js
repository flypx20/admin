import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb,Button,Table,Divider,Input,InputNumber,Switch, Icon  } from 'antd';
import * as actionCreator from './store/actions.js';

const { Column, ColumnGroup } = Table;

const Search = Input.Search;

class ProductList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.handleProductList(1);
	}
	render(){
    const {keyword }= this.props;
		const columns = [{
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render:(name)=>{
        if (keyword) {
          let reg = new RegExp("("+keyword+")",'ig');
          let html = name.replace(reg,'<b style="color:red">$1</b>')
          return <span dangerouslySetInnerHTML={{__html:html}}></span>          
        }else{
          return name;
        }

      }
    }, {
      title: '商品id',
      dataIndex: 'id',
      key: 'id',
    },
     {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      key: 'status',
      render: (status,record 
      	) => {
	    return (<Switch
	    			checkedChildren="在售" 
	    			unCheckedChildren="下架" 
	    			defaultChecked = {
	    				record.status == 0
	    				? true
	    				: false
	    			}
	    			onChange = {
	    				(checked)=>{
	    					this.props.handleStatus(record.id,checked ?0 :1);
	    				}
	    			}
	    		/>)
	  }
    }, {
      title: 'order',
      dataIndex: 'order',
      key:'order',
      render: (order,record 
      	) => {
	    return <InputNumber
	     defaultValue={order}
	     onBlur = {
	     	(e)=>{
	     		this.props.handleOrder(record.id,e.target.value);
	     	}
	     }
	    />
	  },
     
    },
    {
	  title: '操作',
	  key: 'action',
	  render: (text, record) => (
	    <span>
			<Link to={"/product/save/"+record.id} >编辑</Link>
			<span>
				 <Divider type="vertical" />
				 <Link to={"/product/detail/"+record.id} >查看</Link>						
			</span>
	    </span>
	 ),
}];
		const data = this.props.list.map((cates)=>{
			return {
				key:cates.get('_id'),
				id:cates.get('_id'),
				name:cates.get('productName'),
				order:cates.get('order'),
				price:cates.get('productPrice'),
				status:cates.get('status')
			}
		}).toJS();
		//return 只能返回一个
		return(
      <MyLayout>
       	<Breadcrumb>
		    <Breadcrumb.Item>管理中心</Breadcrumb.Item>
		    <Breadcrumb.Item>商品列表</Breadcrumb.Item>
	  	</Breadcrumb>
	  	<div className="clearfix" style={{marginTop:'10px' }}>
        <Search
          placeholder="input search text"
          onSearch={value => this.props.handleSearch(value,1)}
          style={{ width: 200 }}
          enterButton
        />
			<Link to='/product/save' style={{ float:'right',marginBottom:'10px' }}>
				<Button type="primary">新增商品</Button>
			</Link>
		</div>
		<Table
       columns={columns} 
       dataSource={data}
       pagination={
        {
          position:'bottom',
          current:this.props.current,
          defaultCurrent:this.props.current,
          pageSize:this.props.pageSize,
          total:this.props.total
         
        }

       }
        onChange={(pagination)=>{
          if (keyword) {
            this.props.handleSearch(keyword,pagination.current);
          }else{
            this.props.handleProductList(pagination.current);
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
    isFetching:state.get('productState').get('isFetching'),
    pageSize:state.get('productState').get('pageSize'),
    total:state.get('productState').get('total'),
    current:state.get('productState').get('current'),
    list:state.get('productState').get('list'),
    keyword:state.get('productState').get('keyword')
  }
}
const mapProductListActionsToProps = (dispatch)=>{
    return {
      handleProductList:(page)=>{
        const action = actionCreator.getPageAction(page);
        dispatch(action);
      },
      handleOrder:(id,val)=>{
      	const action = actionCreator.setOrder(id,val);
        dispatch(action);      	
      },
      handleStatus:(id,newStatus)=>{
      	const action = actionCreator.setStatus(id,newStatus);
        dispatch(action);        	
      },
      handleSearch:(keyword,page)=>{
        const action = actionCreator.setSearchAction(keyword,page);
        dispatch(action);
      }
  }
}
export default connect(mapProductListStateToProps,mapProductListActionsToProps)(ProductList);