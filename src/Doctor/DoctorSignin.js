import React, { useState } from 'react';
import { UploadPhoto ,register,UploadDocument,GetState,GetAllSpecilization,GetAllDegree,GetOneCity} from '../Service/DoctorService';
import { Form, Input, Radio, DatePicker, Upload, Button, Select, notification } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './DoctorSignin.css';
import axios from "axios";


export const DoctorSignUp = (props) => {

    //For Profile Photo
    const [file, setFile] = useState();
    //For Degree
    const [degreeFile, setDegreeFile] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const saveDegree = (e) => {
        console.log(e.target.files[0]);
        setDegreeFile(e.target.files[0]);
    }

    const onFinish = async (values) => {
        console.log('success', values);
        const formDataPhoto = new FormData();
        formDataPhoto.append("file", file);
        console.log(file.name);
        var imageName="";
        var document = "";
        await UploadPhoto(formDataPhoto).then(res => {
            if (res.data.status === "Success") {
                imageName = res.data.result.imageName;
                
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        }).catch(function (err) {
            notification.error({
                content: err, className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        });
        const formDataDegree = new FormData();
        formDataDegree.append("file",degreeFile);
        console.log(degreeFile.name);
        await UploadDocument(formDataDegree).then(res => {
            if (res.data.status === "Success") {
                document = res.data.result.imageName;
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        }).catch(function (err) {
            notification.error({
                content: err, className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        });
        var dob=new Date(values.dob.toString());
        console.log(dob.toDateString());
        var exdate = new Date(values.exdate.toString());
        console.log(exdate.toDateString());
        const doctorvalues = {
            "email":values.email,
            "fName": values.fname,
            "mName": values.mname,
            "lName": values.lname,
            "password":values.password,
            "gender": value,
            "dob": dob,
            "state_Id": values.state,
            "city_Id": values.city,
            "pincode": values.pincode,
            "experienceStartDate": exdate,
            "profilePicture": imageName,
            "clinicAddress": values.clinicaddress,
            "specialization_Id": values.specialization,
            "degree_Id": values.degree,
            "document": document         
        };
        console.log(doctorvalues);
        await register(doctorvalues).then(res => {
            if (res.data.status === "Success") {
                //imageName = res.data.result.imageName;
                console.log(res.data);
                notification.success({
                    message : 'Register Successfull',
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        }).catch(function (err) {
            notification.error({
                message:'Oops Somthing Went Wrong..!',
                content: err, className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        });
    }

    const OnFinishFailed = (values) => {
        console.log('success', values);
    }


    let loading = false;
    const [items, setItems] = React.useState([]);
    const [specialization, setSpecialization] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const [degree, setDegree] = React.useState([]);
    React.useEffect( () => {
        GetState().then(res=>{
            if(res.data.status==="Success"){
                setItems(res.data.result.map(({ sName, state_Id }) => ({ label: sName, value: state_Id })));
            }else{
                notification.error({
                    content:res.data.message,className:'custom-class',
                    style:{
                        marginTop:'20h',
                    }
                }).catch(function(err){
                    notification.error({
                        message:'Oops Somthing Went Wrong..!',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        });
        GetAllSpecilization().then(res=>{
            if(res.data.status==="Success"){
                setSpecialization(res.data.result);
            }else{
                notification.error({
                    content:res.data.message,className:'custom-class',
                    style:{
                        marginTop:'20h',
                    }
                }).catch(function(err){
                    notification.error({
                        message:'Oops Somthing Went Wrong..!',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        });
        GetAllDegree().then(res=>{
            if(res.data.status==="Success"){
                setDegree(res.data.result);
            }else{
                notification.error({
                    content:res.data.message,className:'custom-class',
                    style:{
                        marginTop:'20h',
                    }
                }).catch(function(err){
                    notification.error({
                        message:'Oops Somthing Went Wrong..!',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        })

    },[]);

    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const getAllCity = id => {
        console.log(id);
        async function GetCitys() {
            const res = await fetch('https://localhost:44338/api/Account/getallcitiesbystate?stateid=' + id);
            const body = await res.json();
            console.log(body);
            if (body.result.length)
                setCity(body.result.map(c => <Select.Option key={c.city_Id}>{c.cName}</Select.Option>));
        }
        GetCitys();
    }

    return (
        <div className="container-fluid register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                    <h3>Welcome To</h3>
                    <h2>Ask My Doc</h2>
                    <p>"LIVE FOR OTHERS IS THE WORTHFUL LIFE"</p>
                </div>

                <div className="col-md-9 register-right">

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 className="register-heading">Doctor Registration</h3>


                            <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={OnFinishFailed} encType="multipart/form-data">
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <Form.Item name="fname" rules={[{
                                            required: true,
                                            message: 'Must Enter the First Name.'
                                        }, { min: 5, message: 'First Name must be minimum 5 characters.' },
                                        { max: 15, message: 'First Name must be maximum 15 characters.' }]}>
                                            <Input placeholder="First Name" allowClear prefix={<UserOutlined />} />
                                        </Form.Item>
                                        <Form.Item name="mname" rules={[{
                                            required: true,
                                            message: 'Must Enter the Middle Name.'
                                        }, { min: 5, message: 'Middle Name must be minimum 5 characters.' },
                                        { max: 15, message: 'Middle Name must be maximum 15 characters.' }]}>
                                            <Input placeholder="Middle Name" allowClear prefix={<UserOutlined />} />
                                        </Form.Item>
                                        <Form.Item name="lname" rules={[{
                                            required: true,
                                            message: 'Must Enter the Last Name.'
                                        }, { min: 5, message: 'Last Name must be minimum 5 characters.' },
                                        { max: 15, message: 'Last Name must be maximum 15 characters.' }]}>
                                            <Input placeholder="Last Name" allowClear prefix={<UserOutlined />} />
                                        </Form.Item>
                                        <div className="row col-md-9">
                                            <Form.Item name="email" rules={[{
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }]}>
                                                <Input placeholder="Email" allowClear prefix={<UserOutlined />} />
                                            </Form.Item>
                                            <div className="col-md-3"><Button type="primary" >Verify</Button></div>
                                            
                                        </div>
                                        
                                        <Form.Item name="password" rules={[{
                                            required: true,
                                            message: 'Must Enter the Password.'
                                        },{ min: 8, message: 'Password must be minimum 8 characters.' },]}>
                                            <Input.Password
                                                placeholder="Password" prefix={<LockOutlined />} allowClear
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>

                                        <Form.Item name="clinicaddress" rules={[{
                                            required: true,
                                            message: 'Must Enter the Clinic Address.'
                                        },]}>
                                            <Input placeholder="Clinic Address" allowClear prefix={<EnvironmentOutlined />} />
                                        </Form.Item>
                                        <Form.Item name="pincode" rules={[{
                                            required: true,
                                            message: 'Must Enter the Pincode.'
                                        },]}>
                                            <Input placeholder="Pincode" allowClear prefix={<LockOutlined />} />
                                        </Form.Item>
                                        <Form.Item name="profile" label="Profile Picture">
                                            <input type="file" onChange={saveFile} />
                                        </Form.Item>

                                        <Form.Item name="degreeimage" label="Upload Degree" rules={[{
                                            required: true,
                                            message: 'Must Upload the Degree'
                                        }]}>
                                            <input type="file" onChange={saveDegree} />
                                        </Form.Item>

                                        {/* <input type="Button" value="upload" onClick={UploadFile} /> */}
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item name="radio" label="Gender" rules={[{
                                            required: true,
                                            message: 'Must select the Gender'
                                        }]} >
                                            <Radio.Group name="gender" onChange={onChange} value={value}>
                                                <Radio value={"Male"}>Male</Radio>
                                                <Radio value={"Female"}>Female</Radio>
                                                <Radio value={"Other"}>Other</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item name="dob" label="Date Of Birth" rules={[{
                                            required: true,
                                            message: 'Must select the DOB'
                                        }]}>
                                            <DatePicker  />
                                        </Form.Item>
                                        <Form.Item name="exdate" label="Experience Start Date" rules={[{
                                            required: true,
                                            message: 'Must select the Experience Start Date'
                                        }]}>
                                            <DatePicker  />
                                        </Form.Item>
                                        <Form.Item name="specialization" rules={[{
                                            required: true,
                                            message: 'Must select the Specialization'
                                        }]}>
                                            <Select showSearch placeholder="Select Your Specialization">
                                                {specialization.map(({ specialization, specializationMaster_Id }) => (
                                                    <option key={specializationMaster_Id} value={specializationMaster_Id}>
                                                        {specialization}
                                                    </option>
                                                ))}

                                                {/* {Specialization.map(data => (
                                                <Select.Option>{data.specialization}</Select.Option>
                                            ))} */}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="degree" rules={[{
                                            required: true,
                                            message: 'Must select the Doctor Degree'
                                        }]}>
                                            <Select showSearch placeholder="Select Your degree">
                                                {degree.map(({ degree, degreeMaster_Id }) => (
                                                    <option key={degreeMaster_Id} value={degreeMaster_Id}>
                                                        {degree}
                                                    </option>
                                                ))}
                                            </Select>
                                        </Form.Item>



                                        <Form.Item name="state" rules={[{
                                            required: true,
                                            message: 'Must select the State'
                                        }]} >
                                            <Select showSearch placeholder="Select Your State" onChange={e => getAllCity(e)}>
                                                {items.map(({ label, value }) => (
                                                    <option key={value} value={value}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="city" rules={[{
                                            required: true,
                                            message: 'Must select the City'
                                        }]}>
                                            <Select placeholder="Select Your City" showSearch >
                                                {city}
                                            </Select>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} >Register</Button>
                                    </div>
                                </div>
                            </Form>

                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default DoctorSignUp
