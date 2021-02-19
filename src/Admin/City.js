import React, { Component } from 'react';
import { GetAllCities, AddCity,GetAllStates,EditCity,GetOneCity,DeleteCity } from '../Service/AdminService';
import { Modal, message ,Button , Popconfirm,Select} from 'antd';
import { MDBDataTable } from 'mdbreact';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons'

import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
export default class City extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            state_Id:0,
            city_Id:0,
            cName: "",
            sName:null,
            loading: false,
            visible: false,
            data:[],
            states:[],
            isModalVisible:false,
            modeltitle:"Add City"
        }
    }

    componentDidMount()
    {
        if (localStorage.getItem('AccessToken') === null) {
            this.props.history.push('/admin')
        } else {
            this.GetAllState();
            this.DisplayAllCities();
        }
    }
    
    async DisplayAllCities() {
        await GetAllCities().then(res => {
            if (res.data.status === "Success") {
                res.data.result.map(item => {
                    item.action = <div><Button type="dashed" onClick={()=>{this.showEditModel(item.city_Id)}} size="sm"><EditOutlined /> </Button> <Popconfirm title="Are you sure to delete this City?"
                    onConfirm={()=>this.Deleteconfirm(item.city_Id)}
                    okText="Yes"
                    cancelText="No">
                    <Button type="dashed"><DeleteOutlined/> </Button>
                    </Popconfirm></div>
                });
                //console.log('City',res.data.result);
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
    
    async GetAllState(){
        if(this.state.states.length==0){
            await GetAllStates().then(res => {
                if (res.data.status === "Success") {
                    this.setState({states:res.data.result});
                    //console.log('States ',this.state.states);
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
    }

    showEditModel = (id)=>
    {
        GetOneCity(id).then(res => {
            if (res.data.status === "Success") {
                var sn= this.state.states.find(s=>s.state_Id == res.data.result.state_Id).sName
                //console.log(sn);
                this.setState({ 
                    modeltitle:"Edit City",
                    isModalVisible:true,
                    state_Id: res.data.result.state_Id,
                    cName:res.data.result.cName,
                    sName:sn,
                    city_Id:res.data.result.city_Id
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

    Deleteconfirm=(id)=>{
        DeleteCity(id).then(res => {
            if (res.data.status === "Success") {
                message.success({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
                this.DisplayAllCities();
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
        this.setState({isModalVisible:true,modeltitle:"Add City",state_Id:0,sName:null});
    };

    handleOk = values => {
        if (this.state.cName != "" && this.state.state_Id != 0) {
            if(this.state.cName.length >= 3 && this.state.cName.length <= 25 && /^[A-Za-z][ A-Za-z]+[A-Za-z]$/.test(this.state.cName)){
                if(this.state.city_Id == 0)
                {
                    AddCity({ 'cName': this.state.cName ,'state_Id' : this.state.state_Id}).then(res => {
                        if (res.data.status === "Success") {
                            this.setState({isModalVisible:false,cName:"",state_Id:0});
                            message.success({
                                content: res.data.message, className: 'custom-class',
                                style: {
                                    marginTop: '20vh',
                                }
                            })
                            this.DisplayAllCities();
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
                }else{
                    EditCity({ 'city_Id':this.state.city_Id, 'state_Id':this.state.state_Id,'cName': this.state.cName }).then(res => {
                        if (res.data.status === "Success") {
                            this.setState({isModalVisible:false,cName:"",state_Id:0,city_Id:0});
                            this.DisplayAllCities();
                            message.success({
                                content: res.data.message, className: 'custom-class',
                                style: {
                                    marginTop: '20vh',
                                }
                            })
                        } else {
                            //.log(res.data.message);
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
                    content: 'City Name length between 3 to 24 and contains alphabets', className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                });
            }
        } else {
            message.error({
                content: 'Please Select State And Enter City', className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            });
        }
    };
    
    handleCancel(){
        this.setState({isModalVisible:false,cName:'',state_Id:0,city_Id:0,sName:null});
    };

    handleChange = (e) => {
        if(e.target){
            const { id, value } = e.target;
            this.setState({cName: value});
        }
        else if(e){
            var sn=this.state.states.find(s=>s.state_Id == e).sName;
            this.setState({state_Id: e,sName:sn});
        }
    }
    render() {
        const options = this.state.states.map((d) => <Select.Option key={d.state_Id}>{d.sName}</Select.Option>);
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
                                                <div>
                                                    <label>State</label>
                                                    <Select
                                                        showSearch
                                                        style={{ width: 200 }}
                                                        placeholder="Select State"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        filterSort={(optionA, optionB) =>
                                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                        }
                                                        id="state"
                                                        value={this.state.sName}
                                                        onChange={(e)=>{this.handleChange(e)}}
                                                    >   
                                                        {options}
                                                    </Select>
                                                </div>
                                                <div>
                                                    <label>City Name</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="cName"
                                                        placeholder="Enter State Name"
                                                        value={this.state.cName}
                                                        onChange={(e)=>{this.handleChange(e)}}
                                                    />
                                                </div>
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
