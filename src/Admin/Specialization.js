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
            specializationMaster_Id: 0,
            SpecializationName: "",
            loading: false,
            visible: false,
            data: [],
            isModalVisible: false,
            modeltitle:"Add Specialization"
        }
    }
    handleEdit = (id) => {
        this.setState({ isModalVisible: true,modeltitle:"Edit Specialization"})
        Getspecialization(id)
            .then(res => {
                this.setState({ SpecializationName: res.data.result.specialization, specializationMaster_Id: res.data.result.specializationMaster_Id })
            })


    }
    confirm = (id) => {

        Deletespecialization(id).then(res => {

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
                this.DisplayAllSpecialization();
            }
            else
            {
                if(res.data.status==="Fail")
                {
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
                    item.action = <div><Button type="dashed" onClick={(id) => this.handleEdit(item.specializationMaster_Id)}><EditOutlined /></Button> <Popconfirm title="Are you sure to delete this Specialization?"
                        onConfirm={(id) => this.confirm(item.specializationMaster_Id)}
                        okText="Yes"
                        cancelText="No">
                        <Button type="dashed" ><DeleteOutlined /></Button>
                    </Popconfirm></div>
                });
        
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
        this.setState({ isModalVisible: true,modeltitle:"Add Specialization" });
    };

    handleOk = values => {
        if (this.state.SpecializationName != "") {
            if (this.state.SpecializationName.length <= 25 && /^[a-zA-Z]+$/.test(this.state.SpecializationName)) {

                if (this.state.specializationMaster_Id == 0) {

                    Addspecialization({ 'Specialization': this.state.SpecializationName }).then(res => {
                        if (res.data.status === "Success") {

                            //console.log(res.data.result)
                            this.setState({ isModalVisible: false, SpecializationName: "" });
                            message.success({
                                content: 'Specialization Has Been Added.!', className: 'custom-class',
                                style: {
                                    marginTop: '15vh',
                                }
                            })
                            this.DisplayAllSpecialization();
                        } else {
                            //console.log(res.data.message);
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
                   
                    Editspecialization({ 'Specialization': this.state.SpecializationName, 'specializationMaster_Id': this.state.specializationMaster_Id }).then(res => {
                        if (res.data.status === "Success") 
                        {
                            //console.log(res.data.result)
                            this.setState({ isModalVisible: false, SpecializationName: "", specializationMaster_Id: 0 });
                            message.success({
                                content: 'Specialization Has Been Updated.!', className: 'custom-class',
                                style: {
                                    marginTop: '15vh',
                                }
                            })
                            this.DisplayAllSpecialization();
                        }
                         else 
                         {
                            //console.log(res.data.message);
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
                    content: 'Please Enter Chareter between 1 to 25 & It Contains Only Charecter', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                });
            }

        }
        else {
            message.error({
                content: 'Please Enter Specialization Name', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    };

    handleCancel() {
        this.setState({ isModalVisible: false, SpecializationName: "" });
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
                                                <Modal title={this.state.modeltitle} visible={this.state.isModalVisible} onOk={() => { this.handleOk() }} onCancel={() => { this.handleCancel() }} >
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
