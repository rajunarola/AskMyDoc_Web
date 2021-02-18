import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined, HistoryOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import AdminHeader from '../_Layout/Admin/AdminHeader';
import AdminFooter from '../_Layout/Admin/AdminFooter';
import AdminSidebar from '../_Layout/Admin/AdminSidebar';
import {changepassword } from '../Service/AdminService';

function ChangePassword() {

  const onfinish=(value)=>
  {
 
    changepassword(value.oldpassword,value.newpassword)
    .then(res=>{
      if(res.data.statusCode==200)
      {
        message.success({
          content: res.data.message, className: 'custom-class',
          style: {
              marginTop: '20vh',
          }
      })
      }
      else
      {
        message.error({
          content: res.data.message, className: 'custom-class',
          style: {
              marginTop: '20vh',
          }
      })
      }
    })

  }
  return (
    <div>
      <div className="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1></h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">ChangePassword</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title"></h3>
                    </div>
                    <div className="card-body">
                      <div className=" row justify-content-center">

                      <Form onFinish={onfinish}>
                        <label><span style={{color:"red"}}>*</span>Old Password</label>
                        <Form.Item
                        
                          name="oldpassword"
                          rules={[{ required: true, message: 'Please input your old password!' }]}
                        >
                         <Input.Password
                          placeholder="old password" prefix={<LockOutlined />} allowClear
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          />
                        </Form.Item>
                        <label><span style={{color:"red"}}>*</span>New Password</label>
                        <Form.Item
                    
                          name="newpassword"
                          hasFeedback
                          rules={[
                            { required: true, message: 'Please input your new password!' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newpassword').length>5 && getFieldValue('newpassword').length<10) {
                                  return Promise.resolve();
                                }
                              
                                return Promise.reject('password between 5 to 10 charecter');
                              },
                            })
                          
                          ]
                          }
                        >
                           <Input.Password
                          placeholder="new password" prefix={<LockOutlined />} allowClear
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          />
                        </Form.Item>
                        <label><span style={{color:"red"}}>*</span>Confirm Password</label>
                        <Form.Item
                        name="confirmpassword"
                    dependencies={['newpassword']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newpassword') === value) {
                            return Promise.resolve();
                          }
                        
                          return Promise.reject('The two passwords that you entered do not match!');
                        },
                      }),
                    ]}
                        >
                         <Input.Password
                          placeholder="comfirm password" prefix={<LockOutlined />} allowClear
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

                          />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">ChangePassword</Button>
                      </Form>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <AdminFooter />
      </div>

    </div>
  )
}
export default withRouter(ChangePassword);