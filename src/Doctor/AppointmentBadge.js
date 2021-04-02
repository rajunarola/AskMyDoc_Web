import React, { Component } from 'react';
import { Layout, message, Button } from 'antd';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import { MDBDataTable } from 'mdbreact';
import { getDoctorAppointment,cancleaapointment } from "../Service/DoctorService";

export default class AppointmentBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem('Token') === null) {
            this.props.history.push('/doctor')
        }
        else {
            this.displayAllAppointment();
        }
        if (localStorage.getItem('AccessToken') !== null) {
            this.props.history.push('/admin/admindashboard')
        }
    }

    join(appointmentid)
    {
        this.props.history.push('/doctormeeting')
    }
    cancel(appointmentid)
    {
        cancleaapointment(id)
        .then(res=>{
            if(res.data.status==="Success")
            {
                message.success({content:res.data.message})
            }
        })
    }

    displayAllAppointment() {
        getDoctorAppointment().then(res => {
            console.log('Appointment console => ',res);
            if(res.data.status==="UnAuthorized")
            {
                this.props.history.push('/')
                localStorage.clear()
            }
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    var dt = new Date(item.aP_Date);
                    item.aP_Date = dt.getDate() + "-" + Number(dt.getMonth() + 1) + "-" + dt.getFullYear();
                    item.document = <a target="_blank" href={`https://localhost:44338/api/Comman/GetFile?file=${item.document}&type=2`}> <img src={`https://localhost:44338/api/Comman/GetFile?file=${item.document}&type=2`} height="100" width="100" /></a>
                    item.actions = <div><Button type="primary" size="sm" key={item.patient_Id}  onClick={(e)=>this.join(item.patient_Id)}>join</Button>&nbsp;
                        <Button type="danger" size="sm" onClick={(e)=>this.join(item.appointmentid)} >Cancel</Button>&nbsp;
                        <Button type="primary" size="sm">Reschedule</Button></div >

                });
                console.log("data =>", res.data);
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