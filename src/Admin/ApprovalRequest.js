import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Form, Input, notification, Popconfirm,Drawer, Button, Col, Row, Select, DatePicker } from 'antd';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined, FolderViewOutlined } from '@ant-design/icons'
import {  getallapprovalrequest,RequestApproved } from '../Service/AdminService';
import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
import Avatar from 'antd/lib/avatar/avatar';

export default class ApprovalRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor_id: 0,
            email: " ",
            fname: " ",
            mname: " ",
            lname: " ",
            gender: " ",
            dob: " ",
            document:"",
            state_id: 0,
            city_id: 0,
            pincode: " ",
            exdate: " ",
            clinicAdd: " ",
            profilePic: " ",
            degreename:"",
            loading: false,
            visible: false,
            SpecializationName:"",
            data: [],
            isModalVisible: false
        }
    }
    handleEdit = (id) => {
        // this.setState({ isModalVisible: true })
        // Getspecialization(id)
        //     .then(res => {
        //         this.setState({ SpecializationName: res.data.result.specialization, specializationMaster_Id: res.data.result.specializationMaster_Id })
        //     })


    }
    confirm = (id) => {

    }
    cancel = (e) => {
        message.success({
            content: 'Record Deleted', className: 'custom-class',
            style: {
                marginTop: '20vh',
            }
        })
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    componentDidMount() {
        if (localStorage.getItem('AccessToken') === null) {
            this.props.history.push('/admin')
        } else {
            this.DisplayAllApprovalRequest();
        }
    }

    approvalrequest = (id,status)=>{
        RequestApproved(id,status).then(res=>{
            if (res.data.status === "Success") {
                message.success({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
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

    DisplayAllApprovalRequest() {

        getallapprovalrequest().then(res => {
        console.log(res)
            if (res.data.status === "Success") {

                res.data.result.approvallist.map(item => {
                    item.profilePic = <div><img className="img-circle img-bordered" src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${item.profilePicture}&type=1`} height="50px" width="50px" /></div>
                    item.action = <div>
                        <Button type="dashed" onClick={()=> this.approvalrequest(item.doctor_Id,true)}><CheckOutlined />Accept </Button> <Button type="dashed" onClick={()=> this.approvalrequest(item.doctor_Id,false)} danger><CloseOutlined />Reject </Button> <Button type="dashed" onClick={() => this.showModal(item.doctor_Id)} ><FolderViewOutlined />View </Button></div>

                });

                this.setState({
                    data: [{
                        columns: [
                            {
                                label: 'Profile',
                                field: 'profilePic',
                                sort: 'asc',
                                width: '30%'
                            },
                            {
                                label: 'Email',
                                field: 'email',
                                sort: 'asc',
                                width: '30%'
                            },
                            {
                                label: 'Name',
                                field: 'fName',
                                sort: 'asc',
                                width: '30%'
                            },

                            {
                                label: 'Action',
                                field: 'action',
                                sort: 'asc',
                                width: '40%'
                            }
                        ],
                        rows: res.data.result.approvallist

                    }]
                });
                //.rows=res.data.result;

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

    showModal = (id) => {
        this.setState({ isModalVisible: true });
            
           var ap=this.state.data[0].rows.filter((res)=>{
               return res.doctor_Id==id;
           })

                this.setState({
                    profilePic:ap[0].profilePicture,
                    fname:ap[0].fName,
                    mname:ap[0].mName,
                    lname:ap[0].lName,
                    email:ap[0].email,
                    dob:ap[0].dob,
                    exdate:ap[0].experienceInYear,
                    gender:ap[0].gender,
                    pincode:ap[0].pincode,
                    SpecializationName:ap[0].SpecializationName,
                    degreename:ap[0].degreeName,
                    document:ap[0].document
                })
                console.log(ap[0]);
            
        
       
    };

    handleOk = values => {

    };

    handleCancel=()=> {
        this.setState({ isModalVisible: false});
    };

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ SpecializationName: value });
    }

    render() {

        return (

            <div className="wrapper">
                <AdminHeader />
                <AdminSidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Approval Request</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Approval Request</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <label>Doctor List</label>
                                            <h3 className="card-title">

                                                <Drawer
                                                    title="Create a new account"
                                                    width={720}
                                                    onClose={this.handleCancel}
                                                    visible={this.state.isModalVisible}
                                                    bodyStyle={{ paddingBottom: 80 }}
                                                   
                                                >
                                                    <Form layout="vertical" hideRequiredMark>
                                                        <Row gutter={16}>
                                                            <Col span={12}>
                                                                <Form.Item>
                                                                   <Avatar size={100} src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${this.state.profilePic}&type=1`} shape="square" ></Avatar>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                 
                                                                >
                                                                    <label>Dr .{this.state.fname} {this.state.mname} {this.state.lname} </label><br/>
                                                                    <label>{this.state.email}</label>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                   
                                                                >
                                                                    <label>Experience :{this.state.exdate} Year</label><br/> <label>Gender :</label><label>{this.state.gender}</label>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    
                                                                >
                                                                   <labe>DOB :{this.state.dob}</labe>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                   
                                                                >
                                                                    <label>Degree Name :{this.state.degreename}</label>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    
                                                                >
                                                                    <label>Pincode :{this.state.pincode}</label>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Col span={24}>
                                                                <Form.Item
                                                                   
                                                                >
                                                                    <label>Document</label><br/>
                                                                    <img  src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${this.state.document}&type=3`} height="200px" width="400px"/>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Drawer>
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <MDBDataTable striped bordered hover data={this.state.data[0]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <AdminFooter />
            </div>

        )
    }
}
