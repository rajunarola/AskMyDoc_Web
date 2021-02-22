import React, { useState, useEffect, useRef } from 'react';
import { Layout, Tabs, Form, Input, Radio, DatePicker, Button, Select, notification } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getDoctorDetail } from "../Service/DoctorService";
import './doctordashboard.css';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import DoctorFooter from '../_Layout/Doctor/DoctorFooter';
const { TabPane } = Tabs;

function DoctorDetail(props) {

  const [detail, setDetail] = useState([]);

  const formRef = useRef(null);


  useEffect(() => {
    getOneDetail();
  }, [])

  const getOneDetail = () => {
    getDoctorDetail().then(res => {
      console.log('res => ', res);

      if (res.data.status == "Success") {
        //setDetail(res.data.result)
        if (formRef) {
          formRef.current.setFieldsValue({
            fname: res.data.result.fName,
            mname: res.data.result.mName,
            lname: res.data.result.lName,
            email: res.data.result.email,
            clinicaddress: res.data.result.clinicaddress,
            pincode: res.data.result.pincode,
            gender: res.data.result.gender,

          })
        }

      } else {
        notification.error({
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        })
      }
    }).catch(err => {
      notification.error({
        message: err,
        style: {
          marginTop: '20vh',
        }
      })
    })
    //console.log('check')
    // console.log('detail => ', detail);

  }
  const { Content } = Layout;

  function callback(key) {
    console.log(key);
  }
  return (
    <div>
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
              <div className="site-card-wrapper">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="Doctor Profile" key="1">
                    <Form name="register" initialValues={{ remember: true }} ref={formRef} encType="multipart/form-data">
                      <div className="row register-form">
                        <div className="col-md-6">
                          <Form.Item name="fname" rules={[{
                            required: true,
                            message: 'Must Enter the First Name.'
                          }, { min: 3, message: 'First Name must be minimum 3 characters.' },
                          { max: 15, message: 'First Name must be maximum 15 characters.' }]}>
                            <Input placeholder="First Name" value={detail.fName} allowClear prefix={<UserOutlined />} />

                          </Form.Item>
                          <Form.Item name="mname" rules={[{
                            required: true,
                            message: 'Must Enter the Middle Name.'
                          }, { min: 3, message: 'Middle Name must be minimum 3 characters.' },
                          { max: 15, message: 'Middle Name must be maximum 15 characters.' }]}>
                            <Input placeholder="Middle Name" value={detail.mName} allowClear prefix={<UserOutlined />} />
                          </Form.Item>
                          <Form.Item name="lname" rules={[{
                            required: true,
                            message: 'Must Enter the Last Name.'
                          }, { min: 3, message: 'Last Name must be minimum 3 characters.' },
                          { max: 15, message: 'Last Name must be maximum 15 characters.' }]}>
                            <Input placeholder="Last Name" value={detail.lName} allowClear prefix={<UserOutlined />} />
                          </Form.Item>

                          <Form.Item name="email" rules={[{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          }]}>
                            <Input placeholder="Email" value={detail.email} disabled allowClear prefix={<UserOutlined />} />
                          </Form.Item>

                          <Form.Item name="clinicaddress" rules={[{
                            required: true,
                            message: 'Must Enter the Clinic Address.'
                          },]}>
                            <Input placeholder="Clinic Address" value={detail.clinicaddress} allowClear prefix={<EnvironmentOutlined />} />
                          </Form.Item>
                          <Form.Item name="pincode" rules={[{
                            required: true,
                            message: 'Must Enter the Pincode.'
                          },]}>
                            <Input placeholder="Pincode" value={detail.pincode} allowClear prefix={<LockOutlined />} />
                          </Form.Item>
                          <Form.Item name="profile" label="Profile Picture">
                            <input type="file" />
                          </Form.Item>

                          <Form.Item name="degreeimage" label="Upload Degree" rules={[{
                            required: true,
                            message: 'Must Upload the Degree'
                          }]}>
                            <input type="file" />
                          </Form.Item>

                          {/* <input type="Button" value="upload" onClick={UploadFile} /> */}
                        </div>
                        <div className="col-md-6">
                          <Form.Item name="radio" label="Gender" rules={[{
                            required: true,
                            message: 'Must select the Gender'
                          }]} >
                            <Radio.Group name="gender" >
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
                            <DatePicker />
                          </Form.Item>
                          <Form.Item name="specialization" rules={[{
                            required: true,
                            message: 'Must select the Specialization'
                          }]}>
                            <Select showSearch placeholder="Select Your Specialization">


                            </Select>
                          </Form.Item>
                          <Form.Item name="degree" rules={[{
                            required: true,
                            message: 'Must select the Doctor Degree'
                          }]}>
                            <Select showSearch placeholder="Select Your degree">

                            </Select>
                          </Form.Item>



                          <Form.Item name="state" rules={[{
                            required: true,
                            message: 'Must select the State'
                          }]} >
                            <Select showSearch placeholder="Select Your State" >

                            </Select>
                          </Form.Item>
                          <Form.Item name="city" rules={[{
                            required: true,
                            message: 'Must select the City'
                          }]}>
                            <Select placeholder="Select Your City" showSearch >

                            </Select>
                          </Form.Item>

                        </div>
                      </div>
                    </Form>
                  </TabPane>
                  <TabPane tab="Specialization" key="2">
                    Content of Tab Pane 2
                                    </TabPane>

                </Tabs>
              </div>
            </Content>
          </Layout>

        </Layout>
        <Layout>

        </Layout>
      </Layout>

    </div>
  );
}
export default withRouter(DoctorDetail)