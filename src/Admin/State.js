import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { GetAllStates, AddState } from '../Service/AdminService';
import { Modal, message } from 'antd';
import { MDBDataTable, MDBBtn } from 'mdbreact';

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
function State(props) {
    const [state, setState] = useState({
        sName: "",
        loading: false,
        visible: false
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);

   
    useEffect(() => {
        if (localStorage.getItem('AccessToken') === null) {
            props.history.push('/admin')
        } else {
            DisplayAllState();
        }
    }, [])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = values => {
        if (state.sName != "") {
            console.log(state.sName);
            AddState({ 'sName': state.sName }).then(res => {
                if (res.data.status === "Success") {
                    res.data.result.map(function (item) {
                        item.action = <MDBBtn className="btn btn-secondary" size="sm">Edit</MDBBtn>
                    });
                    console.log(res.data.result)
                    state.sName = "";
                    setIsModalVisible(false);
                    DisplayAllState();
                } else {
                    console.log(res.data.message);
                    message.error({
                        content: res.data.message, className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                }
            }).catch(function (error) {
                message.error({
                    content: error, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            });
        } else {
            message.error({
                content: 'Please Enter State Name', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const DisplayAllState = () => {
        GetAllStates().then(res => {
            if (res.data.status === "Success") {
                res.data.result.map(function (item) {
                    item.action = <div><MDBBtn className="btn btn-secondary" size="sm">Edit</MDBBtn> <MDBBtn className="btn btn-secondary" size="sm">Delete</MDBBtn></div>
                });
                console.log(res.data.result)
                  data.push({
                      columns: [
                        {
                            label: 'State Name',
                            field: 'sName',
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
                })
                console.log('data',data);
            } else {
                message.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        }).catch(function (error) {
            message.error({
                content: error, className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        });
    }

    return (

        <div className="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>States</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">States</li>
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
                                            <div className="float-right btn btn-secondary" onClick={showModal}>Add State</div>
                                            <Modal title="Add State" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                                                <label>State Name</label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="sName"
                                                    placeholder="Enter State Name"
                                                    value={state.sName}
                                                    onChange={handleChange}
                                                />
                                            </Modal>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <MDBDataTable striped bordered hover data={data[0]} />
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
export default withRouter(State);