import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Radio, DatePicker, Upload, notification, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, HistoryOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './DoctorSignin.css';


export const DoctorSignin = (props) => {
    let loading = false;
    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className="container register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                    <h3>Welcome To</h3>
                    <h2>Ask My Doc</h2>
                    <p>"LIVE FOR OTHERS IS THE WORTHFUL LIFE"</p>
                </div>

                <div className="col-md-9 register-right">

                    <div className="tab-content" id="myTabContent">

                        <h3 className="register-heading">Doctor Registration</h3>
                        <div className="row register-form">
                            <div className="col-md-6">
                                <Form name="register" initialValues={{ remember: false }}>
                                    <Form.Item name="email" rules={[{
                                        required: true,
                                        type: 'email',
                                        message: 'Must Enter the Email.'
                                    },]}>
                                        <Input placeholder="Email" allowClear prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item name="password" rules={[{
                                        required: true,
                                        message: 'Must Enter the Password.'
                                    },]}>
                                        <Input.Password
                                            placeholder="input password" prefix={<LockOutlined />} allowClear
                                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                    </Form.Item>
                                    <Form.Item name="fname" rules={[{
                                        required: true,
                                        message: 'Must Enter the First Name.'
                                    },]}>
                                        <Input placeholder="First Name" allowClear prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item name="mname" rules={[{
                                        required: true,
                                        message: 'Must Enter the Middle Name.'
                                    },]}>
                                        <Input placeholder="Middle Name" allowClear prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item name="lname" rules={[{
                                        required: true,
                                        message: 'Must Enter the Last Name.'
                                    },]}>
                                        <Input placeholder="Last Name" allowClear prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item rules={[{
                                        required: true,
                                        message: 'Must Enter the Clinic Address.'
                                    },]}>
                                        <Input placeholder="Clinic Address" allowClear prefix={<EnvironmentOutlined />} />
                                    </Form.Item>
                                    <Form.Item rules={[{
                                        required: true,
                                        message: 'Must Enter the Pincode.'
                                    },]}>
                                        <Input placeholder="Pincode" allowClear prefix={<LockOutlined />} />
                                    </Form.Item>
                                    <Form.Item name="profilepic" label="Profile Photo">
                                        <Upload>
                                            <Button icon={<UploadOutlined />} >Click To Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="gender" label="Gender" >
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Radio value={1}>Male</Radio>
                                        <Radio value={2}>Female</Radio>
                                        <Radio value={3}>Others</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="Date Of Birth">
                                    <DatePicker />
                                </Form.Item>
                                <div className="row">
                                    <Form.Item label="Experience StartDate">
                                        <DatePicker />
                                    </Form.Item>
                                </div>

                                <Form.Item name="experianceinyear" rules={[{
                                    required: true,
                                    message: 'Must Enter the Experiance in year.'
                                },]}>
                                    <Input placeholder="Experiance in years" prefix={<HistoryOutlined />} />
                                </Form.Item>
                                <Form.Item  >
                                    <Select placeholder="Select Your State">

                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Select placeholder="Select Your City">

                                    </Select>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} >Register</Button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(DoctorSignin);
