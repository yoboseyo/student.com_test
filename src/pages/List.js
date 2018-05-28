import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, Table, Row, Col } from 'antd';
import './List.less';

class List extends Component {
	render () {
		const columns = [{
			title: 'Room name',
		  className: 'column-room-name',
			dataIndex: 'roomName',
		}, {
		  title: 'Price (per week)',
		  className: 'column-price',
		  dataIndex: 'price',
		}];
		const propertyData = this.props.propertyData;
		return (
			<div className="list-page">
				<p className="page-title">Property List</p>
					{
						propertyData.map((item, index) => {
							if (item.saved) {
								let tData_1 = [];
								let tData_2 = [];
								let tData_3 = [];
								let tData_4 = [];
								item.room.forEach((item, index) => {
									switch (index % 4) {
										case 0:
											tData_1.push(item);
											break;
										case 1:
											tData_2.push(item);
											break;
										case 2:
											tData_3.push(item);
											break;
										case 3:
											tData_4.push(item);
											break;
										default:
											break;
									}
								});
								[tData_2, tData_3, tData_4].forEach((item, index) => {
									if (item.length < tData_1.length && item.length > 0) {
										let len = tData_1.length - item.length;
										for (let i = 0; i < len; i++) {
											item.push({
												roomName: '',
												price: '',
												key: ''
											})
										}
									}
								});
								return (
									item.room.length > 0 ?
									<Card key={index} className="property-item" title={item.name}>
										<Row>
											{
												tData_1.length > 0 ?
												<Col sm={{span: 24}} md={{span: 12}}  xl={{span: 6}}>
													<Table
												    columns={columns}
												    dataSource={tData_1}
												    bordered
														pagination={false}
												  />
												</Col>
												:
												''
											}
											{
												tData_2.length > 0 ?
												<Col sm={{span: 24}} md={{span: 12}} xl={{span: 6}}>
													<Table
												    columns={columns}
												    dataSource={tData_2}
												    bordered
														pagination={false}
												  />
												</Col>
												:
												''
											}
											{
												tData_3.length > 0 ?
												<Col sm={{span: 24}} md={{span: 12}} xl={{span: 6}}>
													<Table
												    columns={columns}
												    dataSource={tData_3}
												    bordered
														pagination={false}
												  />
												</Col>
												:
												''
											}
											{
												tData_4.length > 0 ?
												<Col sm={{span: 24}} md={{span: 12}} xl={{span: 6}}>
													<Table
												    columns={columns}
												    dataSource={tData_4}
												    bordered
														pagination={false}
												  />
												</Col>
												:
												''
											}
										</Row>
									</Card>
									:
									<Card key={index} className="property-item" title={item.name}>
										Please add room data!
									</Card>
								)
							}
						})
					}
			</div>
		)
	}
}
export default connect((state) => {
	return {
		propertyData: state.Edit
	}
})(List);
