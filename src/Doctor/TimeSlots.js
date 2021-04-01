import React, { Component } from 'react';
import { Modal, message, Button, Layout, Form, DatePicker, Select, Checkbox } from 'antd';
import { AddDoctorTimeSlot, getDoctorAllTimeSlot } from "../Service/DoctorService";
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default class TimeSlots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            loading: false,
            modeltitle: 'Add TimeSlot',
            duration: 0,
            slot: [],
            startdt: null,
            enddt: null,
            date: null,
            data: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem('Token') === null) {
            this.props.history.push('/doctor')
        } else {
            this.DisplayTimeSlot();
        }
        if (localStorage.getItem('AccessToken') !== null) {
            this.props.history.push('/admin/admindashboard')
        }
    }

    DisplayTimeSlot() {
        getDoctorAllTimeSlot().then(res => {
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    var sdt = new Date(item.startDate);
                    item.startDate = sdt.getDate() + "-" + Number(sdt.getMonth() + 1) + "-" + sdt.getFullYear();
                    var edt = new Date(item.endDate);
                    item.endDate = edt.getDate() + "-" + Number(edt.getMonth() + 1) + "-" + edt.getFullYear();
                    item.slot = <div className="col-md-8">{item.timeSlots.map(i => {
                        return <div className="col-md-6">{i.timeSlotStart + "-" + i.timeSlotEnd}</div>
                    })}</div>
                });
                console.log("data =>", res.data);
                this.setState({
                    data: [{
                        columns: [
                            {
                                label: 'Start Date',
                                field: 'startDate',
                                width: 250
                            },
                            {
                                label: 'End Date',
                                field: 'endDate',
                                width: 270
                            },
                            {
                                label: 'Duration',
                                key: 'dd',
                                field: 'duration',
                                width: 50
                            },
                            {
                                label: 'TimeSlot',
                                field: 'slot',
                                width: 150
                            }
                        ],
                        rows: res.data.result
                    }]
                });
            } else {
                message.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        }).catch(function (err) {
            message.error({
                content: err, className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        });
    }

    showModal() {
        this.setState({ isModalVisible: true, modeltitle: "Add TimeSlot" });
    }

    handleOk = () => {
        this.setState({ loading: true });
        if (this.state.startdt != null && this.state.enddt != null) {
            if (this.state.duration != 0) {
                if (this.state.slot.length != 0) {
                    var timeslot = [];
                    this.state.slot.map(item => {

                        console.log(item.split('-'));
                        timeslot.push({ "timeSlotStart": item.split('-')[0], "timeSlotEnd": item.split('-')[1] });
                    })
                    console.log(timeslot);
                    const docTimeSlot = {
                        "startDate": this.state.startdt,
                        "endDate": this.state.enddt,
                        "duration": this.state.duration,
                        "timeSlots": timeslot
                    }
                    console.log(docTimeSlot);
                    AddDoctorTimeSlot(docTimeSlot).then(res => {
                        if (res.data.status === "Success") {
                            this.setState({ isModalVisible: false, duration: 0, startdt: null, enddt: null, slot: [], loading: false, date: null });
                            message.success({
                                content: res.data.message, className: 'custom-class',
                                style: {
                                    marginTop: '20vh',
                                }
                            })
                        } else {
                            this.setState({ loading: false });
                            message.error({
                                content: res.data.message, className: 'custom-class',
                                style: {
                                    marginTop: '20vh',
                                }
                            })
                        }
                    }).catch(function (err) {
                        this.setState({ loading: false });
                        message.error({
                            content: err, className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                    });
                }
                else {
                    this.setState({ loading: false });
                    message.error({
                        content: 'Please Select Time Slot', className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    });
                }
            }
            else {
                this.setState({ loading: false });
                message.error({
                    content: 'Please Select Duration', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                });
            }
        } else {
            this.setState({ loading: false });
            message.error({
                content: 'Please Select Date', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    }

    handleCancel = () => {
        this.setState({ isModalVisible: false, duration: 0, startdt: null, enddt: null, slot: [], date: null });
    }

    dateOnChange = value => {
        //console.log(value)
        if (value != null) {
            var dt1 = new Date(value[0]);
            var dt2 = new Date(value[1]);
            this.setState({ startdt: dt1, enddt: dt2, date: this.returnMomentDateRange(value[0], value[1]) });
        }
    }
    returnMomentDateRange = (start, finish) => {
        return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
    }

    durationOnChange = value => {
        this.setState({ duration: value });
        //console.log(value);
    }

    slotonChange = (checkedValues) => {
        //console.log('checked = ', checkedValues);
        this.setState({ slot: checkedValues });
    }

    slots = () => {
        var start = 8;
        //var s=[];
        var options = [];
        if (this.state.duration != 0) {
            options = [];
            for (var i = start; i < 12; i++) {
                for (var j = 0; j < 60; j = Number(Number(j) + Number(this.state.duration))) {
                    //s.push(<div className="col-md-3"> {i+":"+j}-{i+":"+Number( Number(j)+ Number(this.state.duration))} </div>)
                    var timei = '', timej = '';
                    if (i.toString().length == 1)
                        timei = "0" + i;
                    else
                        timei = i;
                    if (j == 0)
                        timej = "0" + j;
                    else
                        timej = j;

                    options.push({ label: `${timei + ":" + timej}-${timei + ":" + Number(Number(j) + Number(this.state.duration)) + " AM"}`, value: `${timei + ":" + timej}-${timei + ":" + Number(Number(j) + Number(this.state.duration))}` });
                }
            }
            for (var i = 1; i <= 5; i++) {
                for (var j = 0; j < 60; j = Number(Number(j) + Number(this.state.duration))) {
                    //s.push(<div className="col-md-3"> {i+":"+j}-{i+":"+Number( Number(j)+ Number(this.state.duration))} </div>)
                    var timei = '', timej = '';
                    if (i.toString().length == 1)
                        timei = "0" + i;
                    else
                        timei = i;
                    if (j == 0)
                        timej = "0" + j;
                    else
                        timej = j;

                    options.push({ label: `${timei + ":" + timej}-${timei + ":" + Number(Number(j) + Number(this.state.duration)) + " PM"}`, value: `${timei + ":" + timej}-${timei + ":" + Number(Number(j) + Number(this.state.duration))}` });
                }
            }
        }

        return (
            <div className="row">
                {/* {s.map((it)=>{return it})} */}
                <Checkbox.Group options={options} onChange={(e) => { this.slotonChange(e) }} />
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
                                <Button type="primary" onClick={() => { this.showModal() }}>Add TimeSlot</Button>
                            </div>
                            <div>
                                <Modal title={this.state.modeltitle} visible={this.state.isModalVisible} width={700} onOk={() => { this.handleOk() }} onCancel={() => { this.handleCancel() }}
                                    footer={[
                                        <Button key="back" onClick={() => { this.handleCancel() }}>
                                            Cancel
                                </Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={() => { this.handleOk() }}>
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
                                                <RangePicker value={this.state.date} onChange={(e) => { this.dateOnChange(e) }} disabledDate={(current) => {
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
                                                <Select showSearch placeholder="Select Duration" value={this.state.duration} onChange={(e) => { this.durationOnChange(e) }}>
                                                    <Select.Option key="10" value="10">10</Select.Option>
                                                    <Select.Option key="20" value="20">20</Select.Option>
                                                    <Select.Option key="30" value="30">30</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-12">
                                            <Form.Item name="slot" label="Time Slots"
                                                rules={[{
                                                    required: true,
                                                    message: 'Must select Duration'

                                                }]} >
                                                {this.slots()}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Modal>
                                <MDBDataTable btn striped bordered hover data={this.state.data[0]} />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

