import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Form, Input, Button, notification, Popconfirm, Rate, Switch } from 'antd';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { GetAllFeedback, DeleteFeedback } from '../Service/AdminService';
import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';

export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],

        }
    }
    confirm = (id) => {

        DeleteFeedback(id).then(res => {

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

                this.AllFeedback();
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
    componentDidMount() {
        if (localStorage.getItem('AccessToken') === null) {
            this.props.history.push('/admin')
        } else {
            this.AllFeedback();
        }
        if (localStorage.getItem('Token') !== null) {
            this.props.history.push('/doctor/doctordashboard');
        }
    }

    async AllFeedback() {
        await GetAllFeedback().then(res => {
            console.log("Dattaaa:::", res.data.result)
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    console.log("Items==", item);
                    item.ratings = <div>
                        <Rate allowHalf disabled value={item.ratings} style={{ padding: 5, color: '#FDCC0D', borderRadius: 15, backgroundColor: "lightgrey" }}></Rate>
                    </div>
                    item.isActive = <div>
                        <Switch></Switch>
                    </div>
                    item.action = <div> <Popconfirm title="Are you sure to delete this Feedback details?"
                        onConfirm={(id) => this.confirm(item.feedback_Id)}
                        okText="Yes"
                        cancelText="No">
                        <Button type="danger" ><i class="fas fa-trash-alt"></i></Button>
                    </Popconfirm></div>
                });
                this.setState({
                    data: [{
                        columns: [
                            {
                                label: 'Doctor Name',
                                field: 'doctor_Name',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Patient Name',
                                field: 'patient_Name',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Review',
                                field: 'ratings',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Description',
                                field: 'ratingText',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'IsActive',
                                field: 'isActive',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Action',
                                field: 'action',
                                sort: 'asc',
                                width: 150
                            }
                        ],
                        rows: res.data.result
                    }]
                });
            }
            else {
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
        const StateDataTable = this.state.data;
        return (
            <div className="wrapper" >
                <AdminHeader />
                <AdminSidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Reviews</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Reviews</li>
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
                                                {/* <div className="float-right btn btn-secondary" onClick={()=>{this.showModal()}}>Add State</div>
                                            <Modal title={this.state.modeltitle} visible={this.state.isModalVisible} onOk={()=>{this.handleOk()}} onCancel={()=>{this.handleCancel()}} >
                                                <label>State Name</label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="sName"
                                                    placeholder="Enter State Name"
                                                    autocomplete="off"
                                                    value={this.state.sName}
                                                    onChange={(e)=>{this.handleChange(e)}}
                                                />
                                            </Modal> */}
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <MDBDataTable btn striped bordered hover data={StateDataTable[0]} />
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
