import './Edit.less';
import React, { Component, PureComponent } from 'react';
import {connect} from 'react-redux';
import { Button, Row, Col, List, Popover, Table, Affix, Form, Input, Select, Tooltip, Modal, Icon, message, Popconfirm } from 'antd';
import { selectPropertyAction, deSelectPropertyAction, addRoomAction, saveEditedRoomAction, deleteRoomAction, cancelAddedRoomAction, savePropertyAction } from 'src/store/actions/Edit';
const ListItem = List.Item;
const FormItem = Form.Item;
const Option = Select.Option;

class Edit extends Component {
	constructor () {
		super();
		this.state = {
			modal: false,
			addProperty: false,
      modalData: {
        roomName: '',
        price: '',
        key: -1
      }
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.toAddProperty = this.toAddProperty.bind(this);
    this.toAddRoom = this.toAddRoom.bind(this);
    this.priceGetValueFromEvent = this.priceGetValueFromEvent.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
	}
	openModal (text, record, index) {
    console.log(text, record, index);
		this.setState({
			modal: true,
      modalData: text
		});
	}
	closeModal () {
		this.setState({
			modal: false
		});
	}
	toAddProperty () {
    this.props.deselectProperty();
		this.setState({
			addProperty: true
		});
	}
  toAddRoom (bool) {
    this.setState({
			addProperty: false
		});
    if (bool) {
      this.props.saveProperty();
    } else {
      this.props.cancelAdd();
    }
  }
  priceGetValueFromEvent (e) {
	  if (!e || !e.target) {
	  }
	  const { target } = e;
    let symbol = '';
    this.props.propertyData.forEach((item, index) => {
      if (item.select) {
        symbol = item.symbol;
      }
    });
		if (target.type === 'checkbox') {
			return target.checked;
		} else if (!target.value || (target.value && target.value.indexOf(symbol) < 0)) {
      return symbol;
    } else {
      return target.value.replace(/(^\s*)|(\s*$)/g, "");  // 去空格
    }
	}
  onSelectList (item) {
    if(this.state.addProperty){
      this.setState({
        addProperty: false
      });
      this.props.cancelAdd();
    }
    this.props.selectProperty(item.id);
  }
	render () {
		const columns = [{
			title: 'Room name',
		  className: 'column-room-name',
			dataIndex: 'roomName',
			key: '1',
		}, {
		  title: 'Price (per week)',
		  className: 'column-price',
		  dataIndex: 'price',
			key: '2',
		}, {
			title: 'Actions',
			className: 'column-actions',
			key: 'operation',
			render: (text, record, index) => (<a onClick={() => {this.openModal(text, record, index)}} href="javascript:;"><i className="iconfont iconc-edit"></i>Edit</a>)
		}];

		const addProperty = this.state.addProperty;
    const propertyData = this.props.propertyData;
    let ListData = [];
    let TableData = [];
    let symbol, symTxt  = '';
    propertyData.forEach((item, index) => {
      if (item.select) {
        symbol = item.symbol;
        symTxt = item.currency;
        TableData = item.room;
      }
      if (item.saved) {
        ListData.push(item);
      }
    });

		return (
			<div className="edit-page">
				<p className="page-title">
					Edit Properties
          {
            !addProperty ?
            <Button type="primary" size="large" style={{float: 'right'}} onClick={this.toAddProperty}>Add new property</Button>
            :
            ''
          }
				</p>
				<div className="edit-content">
					<Row style={{minHeight: 600, height: '100%'}}>
						<Col className="list-wrap" span={6}>
							<List
								className="property-list"
								dataSource={ListData}
								renderItem={(item) => (<ListItem className={item.select ? 'property-item active' : 'property-item'} onClick={() => {this.onSelectList(item)}}>
                  <Popover content={item.name}>{item.name}</Popover>
                </ListItem>)}
                split
							>
							</List>
						</Col>
						<Col className="operate-wrap" span={18}>
							<Affix offsetTop={40} target={() => document.getElementById('scroll-wrap')}>
                {
                  addProperty ?
                  <a
                    className="btn-to-addroom"
                    href="javascript:;"
                    onClick={() => {
                      this.toAddRoom(false);
                    }}
                  >
                    <Icon type="close" />
                  </a>
                  :
                  ''
                }
								<div className="operate-content">
									{
										addProperty ?
										<div>
											<p className="subtitle">Propety name</p>
											<WrappedPropertySelectForm
                        propertyData={propertyData} priceGetValueFromEvent={this.priceGetValueFromEvent}
                        selectProperty={this.props.selectProperty}
                      />
										</div>
										:
										''
									}
									<p className="subtitle">Price</p>
									{
										!addProperty ?
										<Table
									    columns={columns}
									    dataSource={TableData}
											pagination={{pageSize: 5}}
										/>
										:
										''
									}
									<div className="add-room-wrap">
										<WrappedAddRoomForm
                      addProperty={addProperty}
                      propertyData={propertyData}
                      symbol={symbol}
                      symTxt={symTxt}
                      priceGetValueFromEvent={this.priceGetValueFromEvent}
                      addRoom={this.props.addRoom}
                    />
									</div>
									{
										addProperty ?
										<div style={{marginTop: 161}}>
											<Button
                        className="btn-save"
                        type="danger"
                        size="large"
                        onClick={() => {
                          this.toAddRoom(true);
                        }}
                      >Save</Button>
											<a
                        className="btn-cancel"
                        href="JavaScript:;"
                        onClick={() => {
                          this.toAddRoom(false);
                        }}
                      >Cancel</a>
										</div>
										:
										''
									}
								</div>
							</Affix>
						</Col>
					</Row>
				</div>
				{/*edit-modal*/}
				<Modal
					className="edit-modal"
          visible={this.state.modal}
					bodyStyle={{padding: '40px 64px', width: 528}}
          onOk={this.handleOk}
          onCancel={this.closeModal}
					footer={null}
					maskStyle={{backgroundColor: 'rgba(248,248,246,.9)'}}
					style={{maxWidth: 528, top: 200}}
          destroyOnClose={true}
        >
						<p className="page-title">Edit Room</p>
						<WrappedEditRoomForm
              modalData={this.state.modalData}
              priceGetValueFromEvent={this.priceGetValueFromEvent}
              saveRoom={this.props.saveRoom}
              delRoom={this.props.delRoom}
              closeModal={this.closeModal}
            />
        </Modal>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
  return {
    propertyData: state.Edit
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    selectProperty: (data) => {
      dispatch(selectPropertyAction(data));
    },
    deselectProperty: () => {
      dispatch(deSelectPropertyAction());
    },
    addRoom: (data) => {
      dispatch(addRoomAction(data));
    },
    saveRoom: (data) => {
      dispatch(saveEditedRoomAction(data));
    },
    delRoom: (data) => {
      dispatch(deleteRoomAction(data));
    },
    cancelAdd: () => {
      dispatch(cancelAddedRoomAction());
    },
    saveProperty: () => {
      dispatch(savePropertyAction());
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Edit);

class addRoomForm extends PureComponent {
  constructor () {
    super();
    this.onAdd = this.onAdd.bind(this);
  }
  onAdd () {
    this.props.form.validateFields((err, vals) => {
      if (!err) {
        const roomData = this.props.form.getFieldsValue()
        this.props.addRoom(roomData);
        message.success('Room: ' + roomData.roomName + ' added!');
      } else {
        console.warn(err);
      }
    });
  }
	render () {
		const { getFieldDecorator, getFieldError } = this.props.form;
		return (
			<Form>
				<Row gutter={16}>
					<Col span={18}>
						<FormItem>
		          {getFieldDecorator('roomName', {
		            rules: [{ required: true, message: 'Please input roomname!' }],
		          })(
		            <Input
									size="large"
									placeholder="Room name"
                  disabled={this.props.symbol ? false : true}
									addonAfter={
										<i className={getFieldError('roomName') ? "iconfont iconc-error-cross" : "iconfont iconc-error-cross none"}></i>
									}
								/>
		          )}
		        </FormItem>
					</Col>
					<Col span={6}>
						<FormItem style={{marginBottom: 0}}>
		          {getFieldDecorator('price', {
                getValueFromEvent: this.props.priceGetValueFromEvent,
    						rules: [{
    							validator: (r, val, cb) => {
                    let formattedVal = val.slice(1);
    								if(typeof Number(formattedVal) === 'number' && !isNaN(Number(formattedVal)) && formattedVal){
                      cb();
    								} else if (!formattedVal) {
    									cb('Please input price!');
    								} else {
    									cb('Please input a number!')
    								}
    							}
    						}]
		          })(
								<Input
									size="large"
									placeholder="Price"
                  disabled={this.props.symbol ? false : true}
									addonAfter={
										<Tooltip title={'Price are based with currency ' + this.props.symTxt} trigger="click" placement="bottom">
											<i className={getFieldError('price') ? "iconfont iconc-error-cross" : "tooltip-price"}>{getFieldError('price') ? '' : '?'}</i>
										</Tooltip>
									}
								/>
		          )}
		        </FormItem>
					</Col>
				</Row>
				<Button type="primary" size="large" onClick={this.onAdd} disabled={this.props.symbol ? false : true}>Add</Button>
			</Form>
		)
	}
}
const WrappedAddRoomForm = Form.create({
  mapPropsToFields(props) {
    return {
      price: Form.createFormField({
        value: props.symbol,
      }),
    };
  }
})(addRoomForm);

class editRoomForm extends PureComponent {
	constructor () {
		super();
		this.onSubmit = this.onSubmit.bind(this);
    this.onDel = this.onDel.bind(this);
	}
	onSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, vals) => {
      if (!err) {
        vals.key = this.props.modalData.key;
        this.props.saveRoom(vals);
        this.props.closeModal();
        message.success('Room: ' + vals.roomName + ' edit success!');
      } else {
				console.log(err);
			}
    });
	}
  onDel () {
    this.props.delRoom(this.props.modalData.key);
    this.props.closeModal();
  }
	render () {
		const { getFieldDecorator, getFieldError } = this.props.form;
		return (
			<Form layout="vertical" onSubmit={this.onSubmit}>
				<FormItem label="Room name">
					{getFieldDecorator('roomName', {
						rules: [{
							required: true, message: 'Please input roomname!'
						}]
					})(
						<Input
							size="large"
							placeholder="Room name"
							addonAfter={
								<i className={getFieldError('roomName') ? "iconfont iconc-error-cross" : "iconfont iconc-error-cross none"}></i>
							}
						/>
					)}
				</FormItem>
				<FormItem label="Price">
					{getFieldDecorator('price', {
						getValueFromEvent: this.props.priceGetValueFromEvent,
						rules: [{
              validator: (r, val, cb) => {
                let formattedVal = val.slice(1);
                if(typeof Number(formattedVal) === 'number' && !isNaN(Number(formattedVal)) && formattedVal){
                  cb();
                } else if (!formattedVal) {
                  cb('Please input price!');
                } else {
                  cb('Please input a number!')
                }
              }
            }]
					})(
						<Input
							key="price"
							size="large"
							placeholder="Price"
							addonAfter={
								<i className={getFieldError('price') ? "iconfont iconc-error-cross" : "iconfont iconc-error-cross none"}></i>
							}
						/>
					)}
				</FormItem>
				<Row>
					<Col span={12}>
						<FormItem style={{marginBottom: 0}}>
		          <Button type="primary" size="large" htmlType="submit" style={{width: 140}}>
		            Save
		          </Button>
		        </FormItem>
					</Col>
					<Col span={12} className="delete-wrap">
            <Popconfirm
              title="Are you sure delete this room?"
              onConfirm={this.onDel}
              onCancel={() => {console.log('cancel')}}
              okText="Yes"
              cancelText="No"
            >
              <a
                className="btn-delete"
                href="javascript:;"
              >
  							<i className="iconfont iconc-icon-delete"></i>
  							Delete
  						</a>
            </Popconfirm>
					</Col>
				</Row>
			</Form>
		)
	}
}
const WrappedEditRoomForm = Form.create({
  mapPropsToFields(props) {
    return {
      roomName: Form.createFormField({
        value: props.modalData.roomName
      }),
      price: Form.createFormField({
        value: props.modalData.price,
      })
    };
  }
})(editRoomForm);

class propertySelectForm extends PureComponent {
  constructor () {
    super();
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect (val) {
    this.props.propertyData.forEach((item, index) => {
      if (item.id === val) {
        this.props.selectProperty(item.id);
        return;
      }
    });
  }
	render () {
		const { getFieldDecorator} = this.props.form;
    const propertyData = this.props.propertyData;
		return (
			<Form>
				<FormItem>
					{getFieldDecorator('property', {
						getValueFromEvent: this.priceGetValueFromEvent,
						rules: [{
							required: true, message: 'Please select a property!'
						}]
					})(
						<Select
							placeholder="Select a property"
							size="large"
              onSelect={this.onSelect}
						>
							{
								propertyData.map((item, index) => {
                  if (!item.saved) {
                    return (
  										<Option key={index} value={item.id}>
  											{item.name}
  										</Option>
  									)
                  }
								})
							}
						</Select>
					)}
				</FormItem>
			</Form>
		)
	}
}
const WrappedPropertySelectForm = Form.create()(propertySelectForm);
