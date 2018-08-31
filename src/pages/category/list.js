import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb,Button,Table,Divider,Input,InputNumber,Modal  } from 'antd';
import * as actionCreator from './store/actions.js';

const { Column, ColumnGroup } = Table;


class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state = {
			pid:this.props.match.params.pid || 0
		};
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
	handleChange(e){
		console.log(e.target.value);
	}
	render(){
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
      render: (order,record 
      	) => {
	    return <InputNumber
	     defaultValue={order}
	     onBlur = {
	     	(e)=>{
	     		this.props.handleOrder(record.pid,record.id,e.target.value);
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
			
				<a 
					href="javascript:;"
					onClick = {()=>{
						this.props.handleCategoryNmae(record.id,record.name);
					}}
				>
					更改名称
				</a>

  
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
          total:this.props.total
         
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
        <Modal
		  title="请填写新的分类名称"
		  visible={this.props.isVisible}
		  mask={false}
		  onCancel={this.props.handleCancel}
		  onOk = {()=>{
		  		this.props.setName(this.state.pid,this.props.current);
		  	}}
		  	confirmLoading={this.props.isComfirmLoading}
			>
		 <Input
		  value = {
		  	this.props.categoryName
		  }
		  onChange = {
		  	(e)=>{
		  		this.props.handleChange(e);
		  	}
		  }
		  />

		</Modal>
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
    list:state.get('categoryState').get('categories'),
    isVisible:state.get('categoryState').get('isVisible'),
    categoryName:state.get('categoryState').get('categoryName'),
    categoryId:state.get('categoryState').get('categoryId'),
    isComfirmLoading:state.get('categoryState').get('isComfirmLoading')
  }
}
const mapCategoryListActionsToProps = (dispatch)=>{
    return {
      handleCategoryList:(pid,page)=>{
        const action = actionCreator.getCategoryListData(pid,page);
        dispatch(action);
      },
      handleCategoryNmae:(id,name)=>{
        const action = actionCreator.getCategoryName(id,name);
        dispatch(action);
      },
      handleCancel:()=>{
    
      		const action = actionCreator.cancelCategoryModal();
        	dispatch(action);
      
      },
      handleOk:(pid,name)=>{
      		const action = actionCreator.setCategoryName(pid,name);
        	dispatch(action);
      },
      handleChange:(e)=>{
      	const action = actionCreator.ChangeCategoryName(e.target.value);
        dispatch(action);
      },
      setName:(pid,page)=>{
      	const action = actionCreator.setCatesName(pid,page);
        dispatch(action);      	
      },
      handleOrder:(pid,id,val)=>{
      	const action = actionCreator.setOrder(pid,id,val);
        dispatch(action);      	
      }
  }
}
export default connect(mapCateGoryListStateToProps,mapCategoryListActionsToProps)(CategoryList);