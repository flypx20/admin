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
      levelOneCategoryId:'',
      levelTwoCategoryName:[],
      levelTwoCategoryId:'',
      needlevelTwoCategoryId:false,
      isChanged:false

    };
    this.handlelevelOneChange = this.handlelevelOneChange.bind(this);
    this.handlelevelTwoChange = this.handlelevelTwoChange.bind(this);
  }
  componentDidMount(){
    this.levelOneCategorySate();
  }
  static getDerivedStateFromProps(props, state){
    const levelOneCategoryidChange = props.ParentCategoryId !== state.levelOneCategoryId;
    const levelTwoCategoryidChange = props.categoryId !== state.levelTwoCategoryId;
    if (state.levelOneCategoryId && !props.ParentCategoryId && !props.categoryId) {
      return null;
    }
    if (!levelOneCategoryidChange && !levelTwoCategoryidChange) {
      return null;
    }
    if (state.isChanged) {
      return null;
    }
    if (props.ParentCategoryId == 0) {
      return {
        levelOneCategoryId:props.categoryId,
        levelTwoCategoryId:'',
        isChanged:true
      };
    }else{
      return {
        levelOneCategoryId:props.ParentCategoryId,
        levelTwoCategoryId:props.categoryId,
        needlevelTwoCategoryId:true,
        isChanged:true
      };
    }
    return null;
  }
  componentDidUpdate(){
    if (this.state.needlevelTwoCategoryId) {
      this.levelTwoCategorySate();
      this.setState({needlevelTwoCategoryId:false});
    }
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
      levelOneCategoryId:val
    },()=>{
      this.levelTwoCategorySate();
      this.onValueChange(this.state.levelOneCategoryId);
    });
  }
  levelTwoCategorySate(){
    request({
      url:CATEGORY_ADD,
      data:{
        pid:this.state.levelOneCategoryId
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
      levelTwoCategoryId:val
      },()=>{
        this.onValueChange(this.state.levelOneCategoryId,this.state.levelTwoCategoryId);
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
    const { levelOneCategoryName,levelOneCategoryId,levelTwoCategoryName,levelTwoCategoryId }  = this.state;
    const levelOneCategory = levelOneCategoryName.map((cates)=>{
      return (<Option key={cates._id} value={cates._id}>{cates.name}</Option>)
    });
    const levelTwoCategory = levelTwoCategoryName.map((cates)=>{
      return (<Option key={cates._id} value={cates._id}>{cates.name}</Option>)
    });
    return (
      
      <div>
        <Select
          defaultValue = {levelOneCategoryId}
          value={levelOneCategoryId}
         style={{ width: 120 }}
         onChange={(value)=>{this.handlelevelOneChange(value)}}
         disabled={this.props.disable}
        >
          {levelOneCategory}
        </Select>
        {
          levelTwoCategoryName.length > 0
          ? (
              <Select
                defaultValue = {levelTwoCategoryId}
                value={levelTwoCategoryId}
               style={{ width: 120 }}
               onChange={(value)=>{this.handlelevelTwoChange(value)}}
               disabled={this.props.disable}
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