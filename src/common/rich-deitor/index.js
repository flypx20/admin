import React,{ Component } from 'react';
import Simditor from 'simditor';
import $ from 'jquery';
import 'simditor/styles/simditor.css';
import './index.css';



class RichEditor extends Component {
	constructor(props){
		super(props);
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
  			
  		});
	}
  
  componentDidMount(){
  	this.loadEditor();
  	this.editor.on('valuechanged',()=>{
  		this.props.getEditorValue(this.editor.getValue());
  	});
  }
  
  
  
  
 loadEditor(){

 	 let config = {
            tabIndent: true,
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'link',
                'hr',
                'image',
                'indent',
                'outdent',
                'alignment',
            ],
            upload: {
                url: this.props.action, //文件上传的接口地址
                fileKey: 'photo'//服务器端获取文件数据的参数名
            },
            textarea: this.textarea
        };
 	this.editor = new Simditor(config);
 }
	
  render() {
  	
    
    return (
      <div >
        <textarea
         ref={(textarea)=>{this.textarea= textarea}}
         name='photo'
         ></textarea>
      </div>
    );
  }
}



export default RichEditor;