import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Button, notification, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import { login } from '../../Service/DoctorService';


export const DoctorLogin = (props) => {
    const [loading, setLoading] = useState();



    const handleRedirect = () => {
        props.history.push('forgotpwd');
    };
    const RedirectToSignUp = () => {
        props.history.push('DoctorSignin');
    }
    const onFinish = values => {

        setLoading(true)
        login(values).then(res => {
            if (res.data.status === "Success") {
                //console.log(res.data.result.token)
                localStorage.setItem('dcotorid', res.data.result.doctor.doctor_Id);
                localStorage.setItem('dcotorname', res.data.result.doctor.fName + " " + res.data.result.doctor.lName);
                localStorage.setItem('Token', res.data.result.token);
                setLoading(false)
                props.history.push("doctor/doctordashboard");
            } else {
                notification.error({ message: res.data.message })
                setLoading(false)
            }
        }).catch(function (errormsg) {
            notification.error({ message: errormsg })
            setLoading(false)
        });
    }
    return (
        <div className="bgDoctor">
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card" style={{ height: "370px", marginTop: "auto", marginBottom: "auto", backgroundColor: 'gray', marginTop: "150px" }}>
                        <div className="card-header">
                            <h2>Doctor Login</h2>
                        </div>

                        <div className="card-body">
                            <Form name="login" name="normal_login" className="login-form" initialValues={{ remember: false }} onFinish={onFinish}>
                                <Form.Item name="email" rules={[{
                                    required: true,
                                    type: 'email',
                                    message: "Must Enter the email.",
                                    max: 25
                                },]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item name="password" rules={[{
                                    required: true,
                                    message: 'Must Enter the Password.'
                                }, {
                                    min: 6,
                                    message: "password Minimum length must be 6"
                                }, {
                                    max: 10,
                                    message: "Password length can't be more then 10"
                                },]}>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">Log In</Button>
                                </Form.Item>
                            </Form>
                        </div>
                        {/* <div className="Logo"></div> */}


                        <div className="card-footer">
                            <div className="d-flex justify-content-center">
                                Don't have an account?<a href="" onClick={RedirectToSignUp}>Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a className="login-form-forgot" onClick={handleRedirect}>
                                    Forgot password
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(DoctorLogin);
