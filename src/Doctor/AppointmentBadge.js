import React, { Component } from 'react';
import io from 'socket.io-client';
import { Layout, message, Button, Spin } from 'antd';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import { MDBDataTable } from 'mdbreact';
import { getDoctorAppointment, cancleaapointment } from "../Service/DoctorService";
const socket = io.connect('https://vivek-webrtc-test2.herokuapp.com');
export default class AppointmentBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        socket.on("me", (id) => {
            //setMe(id)
            console.log("socket.id :", id)
        })
        if (localStorage.getItem('Token') === null) {
            this.props.history.push('/doctor')
        }
        else {
            // <Spin size="large"></Spin>
            this.displayAllAppointment();
        }
        if (localStorage.getItem('AccessToken') !== null) {
            this.props.history.push('/admin/admindashboard')
        }
    }

    join(token, appointmentid) {
        // alert(appointmentid)
        this.props.history.push('/doctormeeting?token=' + token + "&Type=Doctor&AppointmentId=" + appointmentid)
    }
    cancel(appointmentid) {
        // alert(appointmentid)
        cancleaapointment(appointmentid)
            .then(res => {
                if (res.data.status === "Success") {
                    message.success({ content: res.data.message })
                }
            })
        //console.log("id ap[] ===", appointmentid)
    }

    displayAllAppointment() {
        getDoctorAppointment().then(res => {
            // console.log('Appointment console => ', res);
            if (res.data.status === "UnAuthorized") {
                this.props.history.push('/')
                localStorage.clear()
            }
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    var dt = new Date(item.aP_Date);
                    item.aP_Date = dt.getDate() + "-" + Number(dt.getMonth() + 1) + "-" + dt.getFullYear();
                    item.document = <a target="_blank" href={`https://localhost:44338/api/Comman/GetFile?file=${item.document}&type=2`}> <img src={`https://localhost:44338/api/Comman/GetFile?file=${item.document}&type=2`} height="100" width="100" /></a>
                    item.actions = <div><Button type="primary" size="sm" key={item.appointment_Id} onClick={(e) => this.join(item.meetingToken, item.appointment_Id)}>join</Button>&nbsp;
                        <Button type="danger" size="sm" onClick={(e) => this.cancel(item.appointment_Id)} >Cancel</Button>&nbsp;
                        <Button type="primary" size="sm">Reschedule</Button></div >
                    // console.log("item ap id========", item.appointment_Id)
                    //this.displayAllAppointment();


                });
                //console.log("data =>", res.data);
                this.setState({
                    data: [{
                        columns: [
                            {
                                label: 'Date',
                                field: 'aP_Date',
                                width: 250
                            },
                            {
                                label: 'Time Slot',
                                field: 'timeSlot',
                                width: 50
                            },
                            {
                                label: 'Patient Email',
                                field: 'email',
                                width: 370
                            },
                            {
                                label: 'patient Name',
                                field: 'patientName',
                                width: 270
                            },
                            {
                                label: 'Contact No',
                                field: 'contactNo',
                                width: 150
                            },
                            {
                                label: 'Document',
                                field: 'document',
                                width: 150
                            },
                            {
                                label: 'Actions',
                                field: 'actions',
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
                            }}
                        >
                            <MDBDataTable btn striped bordered hover data={this.state.data[0]} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}