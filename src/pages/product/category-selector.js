import React,{ Component } from 'react';
import { Select } from 'antd';
import { request } from 'util';
import { CATEGORY_ADD } from 'api';

const Option = Select.Option;

class CategorySelector extends Component{
  constructor(props){
    super(props);
    this.state = {
      levelOneCategoryName:[],
      levelOneCategoryid:'',
      levelTwoCategoryName:[],
      levelTwoCategoryId:''
    };
    this.handlelevelOneChange = this.handlelevelOneChange.bind(this);
    this.handlelevelTwoChange = this.handlelevelTwoChange.bind(this);
  }
  componentDidMount(){
    this.levelOneCategorySate();
  }
  levelOneCategorySate(){
    request({
      url:CATEGORY_ADD,
      data:{
        pid:0
      }
    })
    .then((result)=>{
      if (result.code == 0) {
        this.setState({
          levelOneCategoryName:result.data
        });
      }
    });

    
  }
  handlelevelOneChange(val){
    // console.log(val);
    this.setState({
      levelOneCategoryid:val
    },()=>{
      this.levelTwoCategorySate();
      this.onValueChange(this.state.levelOneCategoryid);
    });
  }
  levelTwoCategorySate(){
    request({
      url:CATEGORY_ADD,
      data:{
        pid:this.state.levelOneCategoryid
      }
    })
    .then((result)=>{
      if (result.code == 0) {
        this.setState({
          levelTwoCategoryName:result.data
        });
      }
    });

  }
  handlelevelTwoChange(val){
    this.setState({
      levelTwoCategoryid:val
      },()=>{
        this.onValueChange(this.state.levelOneCategoryid,this.state.levelTwoCategoryid);
      });
    }
  onValueChange(pid,id){
    if (id) {
      this.props.getCategories(pid,id);
    }else{
      this.props.getCategories(0,pid);
    }
  }
  render(){
    const { levelOneCategoryName,levelOneCategoryid,levelTwoCategoryName,levelTwoCategoryId }  = this.state;
    const levelOneCategory = levelOneCategoryName.map((cates)=>{
      return (<Option key={cates._id} value={cates._id}>{cates.name}</Option>)
    });
    const levelTwoCategory = levelTwoCategoryName.map((cates)=>{
      return (<Option key={cates._id} value={cates._id}>{cates.name}</Option>)
    });
    return (
      
        <div>
          <Select
           style={{ width: 120 }}
           onChange={(value)=>{this.handlelevelOneChange(value)}}
          >
            {levelOneCategory}
          </Select>
          {
            levelTwoCategoryName.length > 0
            ? (
                <Select
                 style={{ width: 120 }}
                 onChange={(value)=>{this.handlelevelTwoChange(value)}}
                >
                 {levelTwoCategory}
                </Select>
              )
            : null
          }

        </div>
       
    )
  }
  
}

export default CategorySelector;