import React, { Component } from 'react';
import { GetAllStates, AddState , GetOneState,EditState,DeleteState} from '../Service/AdminService';
import { Modal, message ,Button , Popconfirm} from 'antd';
import { MDBDataTable } from 'mdbreact';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons'

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
export default class States extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            state_Id:0,
            sName: " ",
            loading: false,
            visible: false,
            data:[],
            isModalVisible:false,
            modeltitle:"Add State"
        }
    }

    componentDidMount()
    {
        if (localStorage.getItem('AccessToken') === null) {
            this.props.history.push('/admin')
        } else {
            this.DisplayAllState();
        }
    }
    
    showEditModel=(id)=>
    {
        GetOneState(id).then(res => {
            if (res.data.status === "Success") {
                this.setState({ modeltitle:"Edit State",isModalVisible:true,state_Id: res.data.result.state_Id,sName:res.data.result.sName});
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

    Deleteconfirm=(id)=>{
        DeleteState(id).then(res => {
            if (res.data.status === "Success") {
                message.success({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
                // var dt=this.state.data[0];
                // var rows= dt.rows;
                // dt.rows=rows.filter((res)=>{return res.state_Id!= id});
                // this.setState({data:[dt]});
                // console.log('Data',dt,this.state.data);
                this.DisplayAllState();
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

    async DisplayAllState() {
        await GetAllStates().then(res => {
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    item.action = <div><Button type="dashed" onClick={()=>{this.showEditModel(item.state_Id)}} size="sm"><EditOutlined /> </Button> <Popconfirm title="Are you sure to delete this State?"
                    onConfirm={()=>this.Deleteconfirm(item.state_Id)}
                    okText="Yes"
                    cancelText="No">
                    <Button type="dashed"><DeleteOutlined/> </Button>
                    </Popconfirm></div>
                });
                //console.log(res.data.result);
                this.setState({data:[{
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

    showModal(){
        this.setState({isModalVisible:true,modeltitle:"Add State",sName:"",state_Id:0});
    };

    handleOk = values => {
        if (this.state.sName != "" && this.state.sName.length >= 3 && this.state.sName.length <= 25) {
            if(/^[A-Za-z][ A-Za-z]+[A-Za-z]$/.test(this.state.sName))
            {
                if(this.state.state_Id == 0)
                {
                    AddState({ 'sName': this.state.sName }).then(res => {
                        if (res.data.status === "Success") {
                            this.setState({isModalVisible:false,sName:""});
                            this.DisplayAllState();
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
                }else{
                    EditState({ 'state_Id':this.state.state_Id,'sName': this.state.sName }).then(res => {
                        if (res.data.status === "Success") {
                            this.setState({isModalVisible:false,sName:"",state_Id:0});
                            message.success({
                                content: res.data.message, className: 'custom-class',
                                style: {
                                    marginTop: '20vh',
                                }
                            })
                            this.DisplayAllState();
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
            }
            else{
                message.error({
                    content: 'State Name must be alphabet', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                });
            }
        } else {
            message.error({
                content: 'Please Enter State Name and length between 3 to 25 ', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    };
    
    handleCancel(){
        this.setState({isModalVisible:false,sName:'',state_Id:0});
    };

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({sName: value});
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
                                            <div className="float-right btn btn-secondary" onClick={()=>{this.showModal()}}>Add State</div>
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
                                            </Modal>
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
