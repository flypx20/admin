import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb,Button,Table,Divider,Input,InputNumber  } from 'antd';
import * as actionCreator from './store/actions.js';

const { Column, ColumnGroup } = Table;

const columns = [{
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '分类id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'order',
      dataIndex: 'order',
      key:'order',
      render: (order, record) => {
	    return <InputNumber defaultValue={order} />
	  },
     
    },
    {
	  title: '操作',
	  key: 'action',
	  render: (text, record) => (
	    <span>
			<a href="javascript:;">更新分类</a>
			{
				record.pid == 0
				?(
					<span>
						 <Divider type="vertical" />
						 <Link to={"/category/"+record.id} >查看子分类</Link>						
					</span>
					)
				:null

			}

	    </span>
	 ),
}];
class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state = {
			pid:this.props.match.params.pid || 0
		}
	}
	componentDidMount(){
		this.props.handleCategoryList(this.state.pid,1);
	}
	componentDidUpdate(prevProps,prevState){
		let oldPath = prevProps.location.pathname;
		let newPath = this.props.location.pathname;
		if (oldPath != newPath) {
			this.setState({
				pid:this.props.match.params.pid || 0
			},()=>{
				this.props.handleCategoryList(this.state.pid,1);
			});
		}
	}
	render(){
		const data = this.props.list.map((cates)=>{
			return {
				key:cates.get('_id'),
				id:cates.get('_id'),
				name:cates.get('name'),
				order:cates.get('order'),
				pid:cates.get('pid')
			}
		}).toJS();
		//return 只能返回一个
		return(
      <MyLayout>
       	<Breadcrumb>
		    <Breadcrumb.Item>管理中心</Breadcrumb.Item>
		    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
	  	</Breadcrumb>
	  	<div className="clearfix">
	  		<h4 style={{ fontSize:'20px',float:'left',marginTop:'10px' }}>父类id:{this.state.pid}</h4>
			<Link to='/category/add' style={{ float:'right',marginTop:'10px' }}>
				<Button type="primary">新增分类</Button>
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
          total:this.props.total,
         
        }

       }
        onChange={(pagination)=>{
          this.props.handleCategoryList(this.state.pid,pagination.current);
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
const mapCateGoryListStateToProps = (state)=>{
  return {
    isFetching:state.get('categoryState').get('isFetching'),
    pageSize:state.get('categoryState').get('pageSize'),
    total:state.get('categoryState').get('total'),
    current:state.get('categoryState').get('current'),
    list:state.get('categoryState').get('categories')
  }
}
const mapCategoryListActionsToProps = (dispatch)=>{
    return {
      handleCategoryList:(pid,page)=>{
        const action = actionCreator.getCategoryListData(pid,page);
        dispatch(action);
      }
  }
}
export default connect(mapCateGoryListStateToProps,mapCategoryListActionsToProps)(CategoryList);