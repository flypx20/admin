import React,{ Component } from 'react';
import  MyLayout  from 'common/layout/';
import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
class User extends Component{
	render(){
		const data = [{
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  firstName: 'Joe',
  lastName: 'Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
		//return 只能返回一个
		return(
			<MyLayout>
				  <Table dataSource={data}>
      <Column
      	title="name"
        dataIndex="firstName"
        key="firstName"
      />
    <Column
      title="Age"
      dataIndex="age"
      key="age"
    />
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a href="javascript:;">Invite {record.lastName}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )}
    />
  </Table>
			</MyLayout>
		)
	}
}
export default User;