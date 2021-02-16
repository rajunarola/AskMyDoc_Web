import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Form, Input, Button, notification, Popconfirm } from 'antd';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Getspecializations, Addspecialization, Deletespecialization, Editspecialization, Getspecialization } from '../Service/AdminService';
import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';

export default class Specialization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SpecializationName: "",
            loading: false,
            visible: false,
            data: [],
            isModalVisible: false
        }
    }
    handleEdit = (id) => {
        this.setState({ isModalVisible: true })
        Getspecialization(id)
            .then(res => {
                this.setState({ SpecializationName: res.data.result.specialization })
            })


    }
    confirm = (id) => {

        Deletespecialization(id).then(res => {

            if (res.data.status === "Success") {
                this.setState({
                    data: this.state.data.filter((rec) => {
                        message.success({
                            content: 'Record Deleted', className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                        return rec.rows.specializationMaster_Id != id;

                    })
                })

            }
        });


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
            this.DisplayAllSpecialization();
        }
    }

    DisplayAllSpecialization() {

        Getspecializations().then(res => {

            if (res.data.status === "Success") {

                res.data.result.map(item => {
                    item.action = <div><Button type="primary" onClick={(id) => this.handleEdit(item.specializationMaster_Id)} size="sm"><EditOutlined />Edit</Button> <Popconfirm title="Are you sure to delete this Specialization?"
                        onConfirm={(id) => this.confirm(item.specializationMaster_Id)}
                        okText="Yes"
                        cancelText="No">
                        <a href="#" className="btn btn-danger"><DeleteOutlined /> Delete</a>
                    </Popconfirm></div>
                });
                console.log(res.data.result);
                this.setState({
                    data: [{
                        columns: [
                            {
                                label: 'Specialization Name',
                                field: 'specialization',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Action',
                                field: 'action',
                                sort: 'asc',
                                width: 270
                            }
                        ],
                        rows: res.data.result

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

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleOk = values => {
        if (this.state.SpecializationName != "") {
            if (this.state.SpecializationName.length <= 25) {
                Addspecialization({ 'Specialization': this.state.SpecializationName }).then(res => {
                    if (res.data.status === "Success") {

                        console.log(res.data.result)
                        this.setState({ isModalVisible: false, SpecializationName: "" });
                        message.success({
                            content: 'Specialization Has Been Added.!', className: 'custom-class',
                            style: {
                                marginTop: '15vh',
                            }
                        })
                        this.DisplayAllSpecialization();
                    } else {
                        console.log(res.data.message);
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
            else {
                message.error({
                    content: 'Please Enter Chareter between 1 to 25 ', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                });
            }

        } else {
            message.error({
                content: 'Please Enter State Name', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    };

    handleCancel() {
        this.setState({ isModalVisible: false });
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
                                    <h1>Specialization</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Specialization</li>
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
                                            <h3 className="card-title">
                                                <div className="float-right btn btn-secondary" onClick={() => { this.showModal() }}>Add Specialization</div>
                                                <Modal title="Add Specialization" visible={this.state.isModalVisible} onOk={() => { this.handleOk() }} onCancel={() => { this.handleCancel() }} >
                                                    <label>Specialization Name</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="sName"
                                                        placeholder="Enter Specialization Name"
                                                        value={this.state.SpecializationName}
                                                        onChange={(e) => { this.handleChange(e) }}
                                                    />
                                                </Modal>
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
