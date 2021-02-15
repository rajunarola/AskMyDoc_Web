import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GetAllCities, AddCity } from '../Service/AdminService';
import { Modal, message } from 'antd';
import { MDBDataTable, MDBBtn } from 'mdbreact';

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
export default class City extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            state_Id:0,
            cName: " ",
            loading: false,
            visible: false,
            data:[],
            isModalVisible:false,
            modeltitle:"Add City"
        }
    }

    componentDidMount()
    {
        if (localStorage.getItem('AccessToken') === null) {
            this.props.history.push('/admin')
        } else {
            this.DisplayAllCities();
        }
    }
    
    DisplayAllCities() {
        GetAllCities().then(res => {
            if (res.data.status === "Success") {
                res.data.result.map(function (item) {
                    item.action = <div>
                        <MDBBtn id={item.state_Id} className="btn btn-secondary" onClick={()=>{this.showEditModel()}} size="sm">Edit</MDBBtn> <MDBBtn className="btn btn-secondary" size="sm">Delete</MDBBtn>
                        </div>
                });
                //console.log(res.data.result);
                this.setState({data:[{
                    columns: [
                        {
                            label: 'City Name',
                            field: 'cName',
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
                    rows:res.data.result
                }]});              
                //console.log('data',this.state.data);
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
    
    showEditModel = ()=>
    {
        console.log('dfghd');
    }

    showModal(){
        this.setState({isModalVisible:true});
    };

    handleOk = values => {
        if (this.state.cName != "") {
            if(this.state.cName.length > 0 && this.state.cName.length < 25){
                AddCity({ 'cName': this.state.cName }).then(res => {
                    if (res.data.status === "Success") {
                        this.setState({isModalVisible:false,cName:""});
                        this.DisplayAllCities();
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
            else{
                message.error({
                    content: 'State Name length between 3 to', className: 'custom-class',
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
    
    handleCancel(){
        this.setState({isModalVisible:false,sName:''});
    };

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({cName: value});
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
                                <h1>Citys</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">City</li>
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
                                            <div className="float-right btn btn-secondary" onClick={()=>{this.showModal()}}>Add City</div>
                                            <Modal title={this.state.modeltitle} visible={this.state.isModalVisible} onOk={()=>{this.handleOk()}} onCancel={()=>{this.handleCancel()}} >
                                                <label>City Name</label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="cName"
                                                    placeholder="Enter State Name"
                                                    value={this.state.cName}
                                                    onChange={(e)=>{this.handleChange(e)}}
                                                />
                                            </Modal>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <MDBDataTable btn striped bordered hover data={this.state.data[0]} />
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
