import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, Input, Button, Checkbox, notification, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../Service/AdminService';

function AdminLogin(props) {


  useEffect(() => {
    if (localStorage.getItem('Token') !== null) {
      props.history.push('/doctor/doctordashboard');
    }
    if (localStorage.getItem('AccessToken') !== null) {
      props.history.push('/admin/admindashboard')
    }
  });
  const [loading, setLoading] = useState();

  const onFinish = values => {

    setLoading(true);
    login(values).then(res => {
      if (res.data.status === "Success") {


        localStorage.setItem('AccessToken', res.data.result.token);
        localStorage.setItem('AdminEmail', res.data.result.admin.email);

        setLoading({ loading: false });
        props.history.push(`/admin/admindashboard`);
      } else {
        setLoading(false);
        console.log(loading);
        notification.error({ message: res.data.message })

      }
    }).catch(function (errormsg) {
      setLoading(false);
      console.log(loading);
      notification.error({ message: errormsg })

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
                    {
                      max: 25,
                      message: 'email is too long..'
                    }
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
                    {
                      max: 10,
                      min: 6,
                      message: 'Password must between 5 to 10'
                    }
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