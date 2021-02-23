import React, { Component } from 'react';
import { getallDoctor } from '../Service/AdminService';
import { Modal,Button,message} from 'antd';
import { MDBDataTable } from 'mdbreact';

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
export default class DoctorList extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            loading: false,
            data:[],
            isModalVisible:false,
            modeltitle:"Add Doctor"
        }
    }

    componentDidMount()
    {
        if (localStorage.getItem('AccessToken') === null) {
            this.props.history.push('/admin')
        } else {
            this.DisplayAllDoctor();
        }
        if (localStorage.getItem('Token') !== null) {
            this.props.history.push('/doctor/doctordashboard');
        }
    }

    async DisplayAllDoctor(){
        await getallDoctor().then(res => {
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    var dt= new Date(item.dob);
                    item.profilePic = <div><img className="img-circle img-bordered" src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${item.profilePicture}&type=1`} height="50px" width="50px" /></div>
                    item.Name= <samp>{item.fName+" "+item.mName+" "+item.lName}</samp>
                    item.dob= dt.toLocaleDateString()
                });
                //console.log(res.data.result);
                this.setState({data:[{
                    columns: [
                        {
                            label: 'Profile Pic',
                            field: 'profilePic',
                            sort: 'asc',
                            width: 150
                        },
                        {
                            label: 'Doctor Name',
                            field: 'Name',
                            sort: 'asc',
                            width: 150
                        },
                        {
                            label: 'Email',
                            field: 'email',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'Gender',
                            field: 'gender',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'DOB',
                            field: 'dob',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'Specialization',
                            field: 'specializationName',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'Degree',
                            field: 'degreeName',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'State',
                            field: 'stateName',
                            sort: 'asc',
                            width: 270
                        },
                        {
                            label: 'City',
                            field: 'cityName',
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

    render() {
        const StateDataTable= this.state.data; 
        return (
        <div className="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>State</h1>
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