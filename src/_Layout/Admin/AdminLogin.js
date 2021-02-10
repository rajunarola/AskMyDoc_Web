import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import '../Admin/AdminLogin.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function AdminLogin(props)
{

  const handleRedirect=()=>
  {
   props.history.push("admin/forgetpassword");
  }
    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.history.push("admin/admindashboard");
      };
      
    return (
      <div className="row justify-content-center" >
        
        <div className="row col-lg-6 justify-content-center">
          
        <div className="col-lg-6">
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      
    >
      <Form.Item>
        <p className="alert alert-info">Ask My Doc</p>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            type:'email',
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

        <a className="login-form-forgot" onClick={handleRedirect}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button><br/>
      
      </Form.Item>
    </Form>
        </div>
        </div>
        </div>
    )
}

export default withRouter(AdminLogin);