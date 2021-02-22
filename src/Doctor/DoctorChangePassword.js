import React from 'react';
import ReactDom from 'react-dom';
import { Layout, Tabs, Form, Input, Radio, DatePicker, Button, Select, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined, HistoryOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import { ChangePassword } from '../Service/DoctorService';
const { Content } = Layout;

function DoctorChangePassword() {

    const onFinish = (value) => (
        ChangePassword(value.oldpassword, value.newpassword).then(res => {
            if (res.data.statuscode == 200) {
                message.success({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
            else {
                message.error({
                    content: res.data.message, className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    }
                })
            }
        })
    )

    return (
        <Layout>
            <DoctorHeader />
            <Layout>
                <SidePanel />
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 290,
                        }}
                    >
                        <div className="container-fluid register">
                            <div className="row">

                                <div className="col-md-12 register-right">

                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <h3 className="register-heading">Change Password</h3>
                                            <div className="row register-form">
                                                <div className="col-md-9">
                                                    <Form name="change" onFinish={onFinish} initialValues={{ remember: false }}>
                                                        <Form.Item name="oldpassword" label="Old Password" rules={[{
                                                            required: true,
                                                            message: 'Must Enter the Old Password.'
                                                        }, { min: 6, message: 'Password must be minimum 6 characters.' },
                                                        { max: 10, message: "Password length can't be more then 10" }]}>
                                                            <Input.Password
                                                                allowClear />
                                                        </Form.Item>

                                                        <Form.Item name="newpassword" label="New Password" rules={[{
                                                            required: true,
                                                            message: 'Must Enter the New Password.'
                                                        }, { min: 6, message: 'Password must be minimum 6 characters.' },
                                                        { max: 10, message: "Password length can't be more then 10" }]}>
                                                            <Input.Password
                                                                allowClear
                                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                            />
                                                        </Form.Item>

                                                        <Form.Item name="confirmpassword" label="Confirm Password" rules={[{
                                                            required: true,
                                                            message: 'Must Enter the Confirm Password.'
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('newpassword') === value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject('The two passwords that you entered do not match!');
                                                            },
                                                        })]}>
                                                            <Input.Password
                                                                allowClear
                                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                            />
                                                        </Form.Item>




                                                        <Button type="primary" className="col-lg-4" htmlType="submit"  >Change</Button>

                                                    </Form>
                                                </div>



                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </Content>
                </Layout>

            </Layout>
            <Layout>

            </Layout>
        </Layout>
    )
}
export default withRouter(DoctorChangePassword);