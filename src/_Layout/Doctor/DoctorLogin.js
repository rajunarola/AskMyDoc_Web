import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import { login } from '../../Service/DoctorService';
import forgetpassword from '../../Admin/Forgetpassword';

export const DoctorLogin = (props) => {
    let loading = false;
    const openNotification = type => {
        notification[type]({
            message: 'Wrong Credential..!!',
            description: 'Login Failed'
        });
    };
    const openNetworkErrorNotification = (type, error) => {
        notification[type]({
            message: 'Oops Somthing Went Wrong..!',
            description:
                'Message : ' + error,
        });
    };
    const handleRedirect = () => {
        props.history.push("doctor/forgetpassword");
    }
    const onFinish = values => {
        console.log("Received value from form :", values);
        loading = true;
        login(values).then(res => {
            if (res.data.status === "Success") {
                console.log(res.data.result.token)
                localStorage.setItem('dcotorid', res.data.result.doctor.doctor_Id);
                localStorage.setItem('AccessToken', res.data.result.token);
                loading = false;
                props.history.push("doctor/doctorDashboard");
            } else {
                openNotification('error')
            }
        }).catch(function (error) {
            openNetworkErrorNotification('error', error)
        });
    }
    return (
        <div className="bgDoctor">
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h2>Doctor Login</h2>
                        </div>

                        <div className="card-body">
                            <Form name="login" name="normal_login" className="login-form" initialValues={{ remember: false }} onFinish={onFinish}>
                                <Form.Item name="email" rules={[{
                                    required: true,
                                    type: 'email',
                                    message: "Must Enter the email."
                                },]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item name="password" rules={[{
                                    required: true,
                                    message: 'Must Enter the Password.',
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
                                Don't have an account?<a href="">Sign Up</a>
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
