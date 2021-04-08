import React, { useState } from 'react';
import { UploadPhoto, register, UploadDocument, GetState, GetAllSpecilization, GetAllDegree, sendmail, verifyemail, GetCityByState } from '../Service/DoctorService';
import { Form, Input, Radio, DatePicker, Upload, Button, Select, notification, InputNumber } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import './DoctorSignin.css';
import moment from 'moment';


export const DoctorSignUp = (props) => {

    const [btnsubmit, setBtnsubmit] = useState(true);
    const [verifybtn, setVerifybtn] = useState(false);
    const [isdoctorverify, setIsdoctorverify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    //For Profile Photo
    const [file, setFile] = useState();
    //For Degree
    const [degreeFile, setDegreeFile] = useState();
    const [token, setToken] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    }

    const saveDegree = (e) => {
        setDegreeFile(e.target.files[0]);
    }

    const setEmailOnChange = (e) => {
        setEmail(e.target.value);
    }

    const verifyEmail = () => {
        setLoading(true);
        if (email != "") {
            if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,8})+$/.test(email)) {
                sendmail(email).then(res => {
                    if (res.data.status === "Success") {
                        console.log(res.data.result.verifyToken);
                        setToken(res.data.result.verifyToken);
                        setBtnsubmit(false);
                        setVerifybtn(true);
                        setLoading(false);
                        notification.success({
                            message: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '10vh',
                            }
                        })
                    } else {
                        setVerifybtn(false);
                        setLoading(false);
                        notification.error({
                            message: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '10vh',
                            }
                        })
                    }
                }).catch(function (err) {
                    setVerifybtn(false);
                    setLoading(false);
                    notification.error({
                        message: err, className: 'custom-class',
                        style: {
                            marginTop: '10vh',
                        }
                    })
                });
            }
            else {
                setLoading(false);
                notification.error({
                    message: "Please Enter Valid Email", className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        }
        else {
            setLoading(false);
            notification.error({
                message: "Please Enter Email For Verification", className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        }

    }

    const onFinish = async (values) => {
        var isvarify = false;
        setLoading(true);
        setBtnsubmit(true);
        if (token.length > 0) {
            console.log('success', values);
            await verifyemail(values.code, token).then(res => {
                if (res.data.status === "Success") {
                    console.log(res.data);
                    //setBtnsubmit(false);
                    //setLoading(false);
                    isvarify = res.data.result.verify;
                    console.log("res data=====>", res.data.result.verify);
                } else {
                    setBtnsubmit(false);
                    setLoading(false);
                    notification.error({
                        message: res.data.message, className: 'custom-class',
                        style: {
                            marginTop: '10vh',
                        }
                    })
                }
            }).catch(function (err) {
                setBtnsubmit(false);
                setLoading(false);
                notification.error({
                    message: err, className: 'custom-class',
                    style: {
                        marginTop: '10vh',
                    }
                })
            });
            console.log("Doctor Varify==>", isvarify);
            if (isvarify) {
                setLoading(true);
                setBtnsubmit(true);
                const formDataPhoto = new FormData();
                formDataPhoto.append("file", file);
                var imageName = "";
                var document = "";
                await UploadPhoto(formDataPhoto).then(res => {
                    if (res.data.status === "Success") {
                        imageName = res.data.result.imageName;
                    } else {
                        setBtnsubmit(false);
                        setLoading(false);
                        notification.error({
                            message: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                    }
                }).catch(function (err) {
                    setBtnsubmit(false);
                    setLoading(false);
                    notification.error({
                        message: err, className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                });
                const formDataDegree = new FormData();
                formDataDegree.append("file", degreeFile);
                await UploadDocument(formDataDegree).then(res => {
                    if (res.data.status === "Success") {
                        document = res.data.result.imageName;
                    } else {
                        setBtnsubmit(false);
                        setLoading(false);
                        notification.error({
                            message: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                    }
                }).catch(function (err) {
                    setBtnsubmit(false);
                    setLoading(false);
                    notification.error({
                        message: err, className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                });
                setLoading(true);
                setBtnsubmit(true);
                var dob = new Date(values.dob.toString());
                var exdate = new Date(values.exdate.toString());
                const doctorvalues = {
                    "email": values.email,
                    "fName": values.fname,
                    "mName": values.mname,
                    "lName": values.lname,
                    "password": values.password,
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
                        console.log(res.data);
                        setBtnsubmit(false);
                        setLoading(false);
                        notification.success({
                            message: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                        setTimeout(function () { props.history.push('/'); }, 2000);
                    } else {
                        setBtnsubmit(false);
                        setLoading(false);
                        notification.error({
                            message: res.data.message, className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            }
                        })
                    }
                }).catch(function (err) {
                    setBtnsubmit(false);
                    setLoading(false);
                    notification.error({
                        message: err, className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        }
                    })
                });
            }
        }
        else {
            setBtnsubmit(true);
            setLoading(false);
            notification.error({
                message: "Please Verify Email First", className: 'custom-class',
                style: {
                    marginTop: '20vh',
                }
            })
        }
    }

    const OnFinishFailed = (values) => {
        console.log('success', values);
        notification.error({
            message: "Please Fill All The Fields", className: 'custom-class',
            style: {
                marginTop: '20vh',
            }
        })
    }



    const [items, setItems] = React.useState([]);
    const [specialization, setSpecialization] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const [degree, setDegree] = React.useState([]);
    React.useEffect(() => {
        GetState().then(res => {
            if (res.data.status === "Success") {
                setItems(res.data.result.map(({ sName, state_Id }) => ({ label: sName, value: state_Id })));
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20h',
                    }
                }).catch(function (err) {
                    notification.error({
                        message: err,
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        });
        GetAllSpecilization().then(res => {
            if (res.data.status === "Success") {
                setSpecialization(res.data.result);
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20h',
                    }
                }).catch(function (err) {
                    notification.error({
                        message: err,
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        });
        GetAllDegree().then(res => {
            if (res.data.status === "Success") {
                setDegree(res.data.result);
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20h',
                    }
                }).catch(function (err) {
                    notification.error({
                        message: err,
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        })

    }, []);

    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const getAllCity = id => {
        GetCityByState(id).then(res => {
            if (res.data.status === "Success") {
                setCity(res.data.result.map(c => <Select.Option key={c.city_Id}>{c.cName}</Select.Option>));
            } else {
                notification.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20h',
                    }
                }).catch(function (err) {
                    notification.error({
                        message: err,
                        style: {
                            marginTop: '20vh',
                        }
                    })
                })
            }
        })
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
                                        }, { min: 3, message: 'First Name must be minimum 3 characters.' },
                                        { max: 15, message: 'First Name must be maximum 15 characters.' }]}>
                                            <Input placeholder="First Name" allowClear prefix={<UserOutlined />} />
                                        </Form.Item>
                                        <Form.Item name="mname" rules={[{
                                            required: true,
                                            message: 'Must Enter the Middle Name.'
                                        }, { min: 3, message: 'Middle Name must be minimum 3 characters.' },
                                        { max: 15, message: 'Middle Name must be maximum 15 characters.' }]}>
                                            <Input placeholder="Middle Name" allowClear prefix={<UserOutlined />} />
                                        </Form.Item>
                                        <Form.Item name="lname" rules={[{
                                            required: true,
                                            message: 'Must Enter the Last Name.'
                                        }, { min: 3, message: 'Last Name must be minimum 3 characters.' },
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
                                                <Input placeholder="Email" allowClear onChange={setEmailOnChange} prefix={<UserOutlined />} />
                                            </Form.Item>
                                            <div className="col-md-3">

                                                <Button type="primary" onClick={verifyEmail} disabled={verifybtn} loading={loading} >Verify</Button>
                                            </div>

                                            <Form.Item name="code" rules={[
                                                {
                                                    pattern: /^[\d]{6}$/,
                                                    message: "code length must be 6 and Digit Only",
                                                }]}>
                                                <Input placeholder="Code" allowClear prefix={<LockOutlined />} />
                                            </Form.Item>

                                        </div>

                                        <Form.Item name="password" rules={[{
                                            required: true,
                                            message: 'Must Enter the Password.'
                                        }, { min: 6, message: 'Password must be minimum 6 characters.' },
                                        { max: 10, message: "Password length can't be more then 10" }]}>
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
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item name="exdate" label="Experience Start Date"

                                            rules={[{
                                                required: true,
                                                message: 'Must select the Experience Start Date'

                                            }]}>
                                            <DatePicker disabledDate={(current) => {
                                                return moment().add('days') <= current ||
                                                    moment().add(1, 'month') <= current;
                                            }} />
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
                                        <Button type="primary" htmlType="submit" title="Please Verify Email First" className="ant-btn ant-btn-primary" disabled={btnsubmit} loading={loading} >Register</Button>
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
