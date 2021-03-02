import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Form, Input, Button, notification, Popconfirm } from 'antd';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { GetDegrees, GetDegree, AddDegree, DeleteDegree, EditDegree } from '../Service/AdminService';
import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';

export default class Specialization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            degreeMaster_Id: 0,
            degree: "",
            loading: false,
            visible: false,
            data: [],
            isModalVisible: false,
            modeltitle: "Add Degree"
        }
    }
    handleEdit = (id) => {

        this.setState({ isModalVisible: true, modeltitle: "Edit Degree" })
        GetDegree(id)
            .then(res => {

                this.setState({ degree: res.data.result.degree, degreeMaster_Id: res.data.result.degreeMaster_Id })
            })


    }
    confirm = (id) => {

        DeleteDegree(id).then(res => {

            if (res.data.status === "Success") {
                this.setState({
                    data: this.state.data
                })

                message.success({
                    content: 'Record Deleted', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })

                this.DisplayAllDegree();
            }
            else {
                if (res.data.status === "Fail") {
                    message.info({
                        content: res.data.message, className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                }
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
            this.DisplayAllDegree();
        }
    }

    DisplayAllDegree() {

        GetDegrees().then(res => {

            if (res.data.status === "Success") {

                res.data.result.map(item => {

                    item.action = <div><Button type="primary" onClick={(id) => this.handleEdit(item.degreeMaster_Id)}><i class="fas fa-pencil-alt"></i></Button> <Popconfirm title="Are you sure to delete this Degree?"
                        onConfirm={(id) => this.confirm(item.degreeMaster_Id)}
                        okText="Yes"
                        cancelText="No">
                        <Button type="danger" ><i class="fas fa-trash-alt"></i></Button>
                    </Popconfirm></div>
                });

                this.setState({
                    data: [{
                        columns: [
                            {
                                label: 'Degree',
                                field: 'degree',
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
        this.setState({ isModalVisible: true, modeltitle: "Add Degree" });
    };

    handleOk = values => {
        if (this.state.degree != "") {
            if (this.state.degree.length <= 100 && /^[a-zA-Z ]+$/.test(this.state.degree)) {

                if (this.state.degreeMaster_Id == 0) {
                    AddDegree({ 'degree': this.state.degree }).then(res => {
                        if (res.data.status === "Success") {

                            console.log(res.data.result)
                            this.setState({ isModalVisible: false, Degree: "" });
                            message.success({
                                content: 'Degree Has Been Added.!', className: 'custom-class',
                                style: {
                                    marginTop: '15vh',
                                }
                            })
                            this.DisplayAllDegree();
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

                    EditDegree({ 'degree': this.state.degree, 'degreeMaster_Id': this.state.degreeMaster_Id }).then(res => {
                        if (res.data.status === "Success") {

                            this.setState({ isModalVisible: false, degree: "", degreeMaster_Id: 0 });
                            message.success({
                                content: 'Degree Has Been Updated.!', className: 'custom-class',
                                style: {
                                    marginTop: '15vh',
                                }
                            })
                            this.DisplayAllDegree();
                        }
                        else {
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
            }
            else {
                message.error({
                    content: 'Please Enter Chareter between 1 to 100 & It Contains Only Charecter with (Space)', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                });
            }

        }
        else {
            message.error({
                content: 'Please Enter Degree Name', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    };

    handleCancel() {
        this.setState({ isModalVisible: false, degree: "" });
    };

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ degree: value });
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
                                    <h1>Doctor Degrees</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Degree</li>
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
                                                <div className="float-right btn btn-secondary" onClick={() => { this.showModal() }}>Add Degree</div>
                                                <Modal title={this.state.modeltitle} visible={this.state.isModalVisible} onOk={() => { this.handleOk() }} onCancel={() => { this.handleCancel() }} >
                                                    <label>Degree Name</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="sName"
                                                        placeholder="Enter Degree Name"
                                                        value={this.state.degree}
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
