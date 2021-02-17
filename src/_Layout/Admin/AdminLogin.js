import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { withRouter } from 'react-router-dom';

import { Form, Input, Button, Checkbox, notification, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../Service/AdminService';

function AdminLogin(props) {

  console.log('props.history',props.history)

  let loading = false;
  const openNotification = type => {
    notification[type]({
      message: 'Oops Wrong Credentail..!',
      description:
        'login attempt fail',
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
  console.log('changepassword')
  }

  const onFinish = values => {
    console.log('Received values of form: ', values);
    loading = true;
    login(values).then(res => {
      if (res.data.status === "Success") {
        console.log(res.data.result.token)
        localStorage.setItem('adminid', res.data.result.admin.admin_Master_Id);
        localStorage.setItem('AccessToken', res.data.result.token);
        loading = false;
        props.history.push(`/admin/admindashboard`);
      } else {
        openNotification('error')
      }
    }).catch(function (error) {
      openNetworkErrorNotification('error', error)
    });
  };

  return (
    <div className='bgForLogin'>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card" style={{ height: "370px", marginTop: "auto", marginBottom: "auto", backgroundColor: 'gray', marginTop: "150px" }}>
            <div className="card-header">

              <h3>Ask My Doc</h3>

              {/* <div className="d-flex justify-content-end social_icon">
              <span><i className="fab fa-facebook-square"></i></span>
              <span><i className="fab fa-google-plus-square"></i></span>
              <span><i className="fab fa-twitter-square"></i></span>
            </div> */}
            </div>
            <div className="card-body">

              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: false,
                }}
                onFinish={onFinish}

              >

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please input your valid Email!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  {/* <Form.Item name="remember" valuePropName="unchecked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}


                </Form.Item>

                <Form.Item>
                <div className="d-flex justify-content-center">
                <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
                    Log in
                  </Button><br />
                </div>
                 

                </Form.Item>
              </Form>

            </div>
            <div className="card-footer">
             
              <div className="d-flex justify-content-center">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(AdminLogin);