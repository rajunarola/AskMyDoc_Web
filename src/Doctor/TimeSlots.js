import React, { useEffect, useState, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Button, Layout, Form, DatePicker, Select } from 'antd';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default class TimeSlots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            loading: false,
            modeltitle: 'Add TimeSlot',
            duration: 0
        }
    }

    componentDidMount() {
        if (localStorage.getItem('Token') === null) {
            this.props.history.push('/')
        }
        if (localStorage.getItem('AccessToken') !== null) {
            this.props.history.push('/admin/admindashboard')
        }
    }

    showModal () {
        this.setState({ isModalVisible: true, modeltitle: "Add TimeSlot" });
    }

    handleOk = () => {
        if (!this.state) {

        } else {
            message.error({
                content: 'Please ', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    }

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    }

    dateOnChange = value => {
        console.log(value)
        var dt1 = new Date(value[0]);
        console.log(dt1);
        var dt2 = new Date(value[1]);
        console.log(dt2);
    }

    durationOnChange = value => {
        this.setState({ duration: value });
        console.log(value);
    }

    slots=()=>
    {
        var start=8;
        var minutes=0;
        var s=[];
        if(this.state.duration!=0)
        {
            for(var i=start;i<=12;i++)
            {
                for(var j=0;j<=60;j=Number( Number(j)+ Number(this.state.duration)))
                {
                    s.push(<span> {i+":"+j}-{i+":"+Number( Number(j)+ Number(this.state.duration))} </span>)
                }
            }
        }
        
        return (
            <div>
                {s.map((it)=>{return it})}
            </div>
        )
    }

    render() {
        const { Content } = Layout;
        return (
            <Layout>
                <DoctorHeader />
                <Layout>
                    <SidePanel />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}>
                            <div style={{ float: 'right' }}>
                                <Button type="primary" onClick={()=>{ this.showModal()}}>Add TimeSlot</Button>
                            </div>
                            <div>
                                <Modal title={this.state.modeltitle} visible={this.state.isModalVisible} width={700} onOk={()=>{this.handleOk()}}
                                    footer={[
                                        <Button key="back" onClick={()=>{this.handleCancel()}}>
                                            Cancel
                                </Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={()=>{this.handleOk()}}>
                                            Submit
                                </Button>,
                                    ]}>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <Form.Item name="startdate" label="Date"
                                                rules={[{
                                                    required: true,
                                                    message: 'Must select Date'

                                                }]} >
                                                <RangePicker onChange={()=>{this.dateOnChange()}} disabledDate={(current) => {
                                                    return moment().add(-1, 'days') >= current ||
                                                        moment().add(-1, 'month') >= current;
                                                }} />
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-5">
                                            <Form.Item name="duration" label="Duration"
                                                rules={[{
                                                    required: true,
                                                    message: 'Must select Duration'

                                                }]} >
                                                <Select showSearch placeholder="Select Duration" onChange={(e)=>{this.durationOnChange(e)}}>
                                                    <Select.Option key="10" value="10">10</Select.Option>
                                                    <Select.Option key="20" value="20">20</Select.Option>
                                                    <Select.Option key="30" value="30">30</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-12">
                                            {this.slots()}
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

