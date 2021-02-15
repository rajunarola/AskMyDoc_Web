import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Radio, DatePicker, Upload, notification, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, HistoryOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './DoctorSignin.css';


export const DoctorForgotPwd = (props) => {
    let loading = false;
    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div class="container register">
            <div class="row">
                <div class="col-md-3 register-left">
                    <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                    <h3>Welcome To</h3>
                    <h2>Ask My Doc</h2>
                    <p>"LIVE FOR OTHERS IS THE WORTHFUL LIFE"</p>
                </div>

                <div class="col-md-9 register-right">

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 class="register-heading">Forgot Password</h3>
                            <div class="row register-form">
                                <div class="col-md-9">
                                    <Form name="register" initialValues={{ remember: false }}>
                                        <Form.Item name="email" label="Email" rules={[{
                                            required: true,
                                            type: 'email',
                                            message: 'Must Enter the Email.'
                                        },]}>
                                            <Input allowClear />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} >Send</Button>
                                    </Form>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(DoctorForgotPwd);