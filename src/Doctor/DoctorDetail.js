import React, { useState, useEffect, useRef } from 'react';
import { Layout, Tabs, Form, Input, Radio, DatePicker, Button, Select, notification } from 'antd';
import { UserOutlined, LockOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import {
  getDoctorDetail,
  GetState,
  GetCityByState,
  GetAllSpecilization,
  GetAllDegree,
  getAllDoctorDegree,
  EditData,
  UploadPhoto,
  doctorSpecialization, EditSpecialization
} from "../Service/DoctorService";
import './doctordashboard.css';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import moment from 'moment';


function DoctorDetail(props) {
  const [detail, setDetail] = useState([]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null)
  const [items, setItems] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [specialization, setSpecialization] = React.useState([]);
  const [degree, setDegree] = React.useState([]);
  const [doc, setDoc] = React.useState();
  const [docSp, setDocSp] = React.useState([])
  const [cityName, setCityName] = React.useState();


  const docRef = useRef(null);
  const { TabPane } = Tabs;
  const formRef = useRef(null);
  useEffect(async () => {
    // Promise.all([getDoctorDetail(), GetState(), GetAllSpecilization(), GetAllDegree(), getAllDoctorDegree()]).then(values => {
    //   console.log('values => ', values);
    //   setDetail(values[0].data.result)
    //  
    //   setSpecialization(values[2].data.result);
    //   setDegree(values[3].data.result);
    //   setDoc(values[4].data.result);
    //   if (formRef) {
    //     formRef.current.setFieldsValue({
    //       fname: values[0].data.result.fName,
    //       mname: values[0].data.result.mName,
    //       lname: values[0].data.result.lName,
    //       email: values[0].data.result.email,
    //       clinicaddress: values[0].data.result.clinicAddress,
    //       pincode: values[0].data.result.pincode,
    //       radio: values[0].data.result.gender,
    //       state: values[0].data.result.state_Id,
    //       //city: values[0].data.result.city_Id,
    //       dob: moment(moment(values[0].data.result.dob).format('YYYY-MM-DD'), ('YYYY-MM-DD')),
    //       exdate: moment(moment(values[0].data.result.experienceStartDate).format('YYYY-MM-DD'), ('YYYY-MM-DD')),
    //       specialization: values[0].data.result._Id,
    //       degree: values[0].data.result.degreeMaster_Id
    //     })
    //   }
    // }).catch(err => {

    // })
    getOneDetail();
    docSpecialization();
    await GetState().then(res => {
      if (res.data.status === "Success") {
        setItems(res.data.result.map(({ sName, state_Id }) => ({ label: sName, value: state_Id })));
      } else {
        notification.error({
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        }).catch(function (err) {
          notification.error({
            message: err,
            style: {
              marginTop: '20vh',
            }
          })
        })
      }
    });
    await GetAllSpecilization().then(async res => {
      if (res.data.status === "Success") {
        await setSpecialization(res.data.result);
        await doctorSpecialization().then(async res1 => {
          if (res1.data.status === "Success") {

            var d = res.data.result.find(f => f.specializationMaster_Id == res1.data.result[0].specializationMaster_Id);
            await setDocSp(d.specialization);
          } else {
            notification.error({
              content: res1.data.message, className: 'custom-class',
              style: {
                marginTop: '20h',
              }
            }).catch(function (err) {
              notification.error({
                message: err,
                style: {
                  marginTop: '20vh',
                }
              })
            })
          }
        })
      } else {
        notification.error({
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        }).catch(function (err) {
          notification.error({
            message: err,
            style: {
              marginTop: '20vh',
            }
          })
        })
      }
    });

    await GetAllDegree().then(async res => {
      if (res.data.status === "Success") {
        await setDegree(res.data.result);
        await getAllDoctorDegree().then(async res1 => {
          if (res1.data.status === "Success") {
            var d = res.data.result.find(f => f.degreeMaster_Id == res1.data.result[0].degreeMaster_Id);
            await setDoc(d.degree);
          } else {
            notification.error({
              content: res1.data.message, className: 'custom-class',
              style: {
                marginTop: '20h',
              }
            }).catch(function (err) {
              notification.error({
                message: err,
                style: {
                  marginTop: '20vh',
                }
              })
            })
          }
        })
      } else {
        notification.error({
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        }).catch(function (err) {
          notification.error({
            message: err,
            style: {
              marginTop: '20vh',
            }
          })
        })
      }
    })
  }, [])

  const docSpecialization = async () => {
    await doctorSpecialization().then(res => {
      if (res.data.status === "Success") {
        // setDocSp(res.data.result.map(({ SpecializationMaster_Id }) => ({ value: SpecializationMaster_Id })));
        //  console.log('spdata', res)
      } else {
        notification.error({
          message: "UnAuthorized User or Maybe Token Expire Please Re-Login",
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        })
      }
    }).catch(err => {
      console.log('err => ', err);
      notification.error({
        message: "Network Error...!!!!",
        message: err,
        style: {
          marginTop: '20vh',
        }
      })
    })
  }


  const getOneDetail = async () => {
    await getDoctorDetail().then(async res => {
      //console.log('res => ', res);
      if (res.data.status == "Success") {
        if (formRef) {
          await getAllCity(res.data.result.state_Id);
          formRef.current.setFieldsValue({
            fname: res.data.result.fName,
            mname: res.data.result.mName,
            lname: res.data.result.lName,
            email: res.data.result.email,
            clinicaddress: res.data.result.clinicAddress,
            pincode: res.data.result.pincode,
            radio: res.data.result.gender,
            state: res.data.result.state_Id,
            city: res.data.result.city_Id,
            dob: moment(moment(res.data.result.dob).format('YYYY-MM-DD'), ('YYYY-MM-DD')),
            exdate: moment(moment(res.data.result.experienceStartDate).format('YYYY-MM-DD'), ('YYYY-MM-DD')),
          })
          //setCityName(res.data.result.cityName);
        }
        setDetail(res.data.result)
      } else {
        notification.error({
          message: "UnAuthorized User or Maybe Token Expire Please Re-Login",
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        })
      }
    }).catch(err => {
      console.log('err => ', err);
      notification.error({
        message: "Network Error...!!!!",
        message: err,
        style: {
          marginTop: '20vh',
        }
      })
    })
  }
  const getAllCity = async id => {
    await GetCityByState(id).then(res => {
      if (res.data.status === "Success") {
        setCity(res.data.result.map(c => <Select.Option key={c.city_Id} value={c.city_Id}>{c.cName}</Select.Option>));
      } else {
        notification.error({
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        }).catch(function (err) {
          notification.error({
            message: err,
            style: {
              marginTop: '20vh',
            }
          })
        })
      }
    })
  }

  // const getDegree = id => {
  //   getDoctorDegree(id).then(res => {
  //     if (res.data.state === "success") {
  //       setDoc(res.data.result)
  //       console.log('res => ', res);
  //     }
  //     else {
  //       notification.error({
  //         content: res.data.message, className: 'custom-class',
  //         style: {
  //           marginTop: '20h',
  //         }
  //       }).catch(function (err) {
  //         notification.error({
  //           message: err,
  //           style: {
  //             marginTop: '20vh',
  //           }
  //         })
  //       })
  //     }
  //   })
  // }
  //console.log('doc => ', doc);
  const onFinish = async (values) => {
    console.log('values => ', values);
    const formDataPhoto = new FormData()
    formDataPhoto.append("file", imageName)
    var profilePicture = "";
    if (image) {
      await UploadPhoto(formDataPhoto).then(res => {
        if (res.data.status === "Success") {
          profilePicture = res.data.result.imageName
        }
        else {
          notification.error({
            message: res.data.message, className: 'custom-class',
            style: {
              marginTop: '20vh',
            }
          })
        }
      }).catch(function (err) {
        notification.error({
          message: err, className: 'custom-class',
          message: "error..!!",
          style: {
            marginTop: '20vh',
          }
        })
      });
    }
    const doctorvalues = {
      fName: values.fname,
      email: values.email,
      mName: values.mname,
      lName: values.lname,
      gender: values.radio,
      dob: moment(values.dob).format('YYYY-MM-DD'),
      state_Id: values.state,
      city_Id: values.city,
      pincode: values.pincode,
      experienceStartDate: moment(values.experienceStartDate).format('YYYY-MM-DD'),
      profilePicture: profilePicture,
      clinicAddress: values.clinicaddress,
    };
    console.log('doctorvalues', doctorvalues);
    EditData(doctorvalues).then(res => {
      if (res.data.status === "Success") {
        console.log('EditData', res.data);
        notification.success({
          message: doctorvalues.fName + "'s detail is updated..!!",
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          }
        })
      } else {
        notification.error({
          message: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20vh',
          }
        })
      }
    }).catch(function (err) {
      notification.error({
        message: err, className: 'custom-class',
        style: {
          marginTop: '20vh',
        }
      })
    });
  }

  const onSpecialization = values => {
    console.log('values => ', values);
    const spData = {
      specialization: values.specializationMaster_Id
    };
    EditSpecialization(spData).then(res => {
      if (res.data.status === "Success") {
        console.log('EditData', res.data);
        notification.success({
          message: "sp is updated..!!",
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          }
        }).catch(function (err) {
          notification.error({
            message: err, className: 'custom-class',
            style: {
              marginTop: '20vh',
            }
          })
        });
      } else {
        notification.error({
          message: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20vh',
          }
        })
      }
    })
  }

  const { Content } = Layout;

  function callback(key) {
    console.log(key);
  }

  const onChangeImage = (e) => {
    console.log('e => ', e.target.files[0]);
    setImageName(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  //console.log('image => ', image);

  return (
    <div>
      <Layout>
        <DoctorHeader />
        <Layout>
          <SidePanel />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 290, }} >
              <div className="site-card-wrapper">
                <h2>Doctor Profile</h2>

                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="Doctor Profile" key="1">
                    <Form name="registe1r" initialValues={{ remember: true }} onFinish={onFinish} ref={formRef} encType="multipart/form-data">
                      <div className="row register-form">

                        <div className="col-md-6">

                          <Form.Item name="fname" rules={[
                            { required: true, message: 'Must Enter the First Name.' },
                            { min: 3, message: 'First Name must be minimum 3 characters.' },
                            { max: 15, message: 'First Name must be maximum 15 characters.' }
                          ]}>
                            <Input placeholder="First Name" allowClear prefix={<UserOutlined />} />
                          </Form.Item>
                          <Form.Item name="mname" rules={[
                            { required: true, message: 'Must Enter the Middle Name.' },
                            { min: 3, message: 'Middle Name must be minimum 3 characters.' },
                            { max: 15, message: 'Middle Name must be maximum 15 characters.' }
                          ]}>
                            <Input placeholder="Middle Name" allowClear prefix={<UserOutlined />} />
                          </Form.Item>
                          <Form.Item name="lname" rules={[{
                            required: true,
                            message: 'Must Enter the Last Name.'
                          }, { min: 3, message: 'Last Name must be minimum 3 characters.' },
                          { max: 15, message: 'Last Name must be maximum 15 characters.' }]}>
                            <Input placeholder="Last Name" allowClear prefix={<UserOutlined />} />
                          </Form.Item>

                          <Form.Item name="email" rules={[{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          }]}>
                            <Input placeholder="Email" disabled allowClear prefix={<UserOutlined />} />
                          </Form.Item>

                          <Form.Item name="clinicaddress" rules={[{
                            required: true,
                            message: 'Must Enter the Clinic Address.'
                          },]}>
                            <Input placeholder="Clinic Address" allowClear prefix={<EnvironmentOutlined />} />
                          </Form.Item>
                          <Form.Item name="pincode" rules={[{
                            required: true,
                            message: 'Must Enter the Pincode.'
                          },]}>
                            <Input placeholder="Pincode" allowClear prefix={<LockOutlined />} />
                          </Form.Item>
                          <label>Profile Picture</label>
                          {/* <Form.Item name="profile" label="Profile Picture"> */}
                          <input type="file" onChange={(e) => onChangeImage(e)} />
                          {/* </Form.Item> */}
                          {image === null ? <div>
                            <img name="image" width={200} height={200}
                              src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${detail.profilePicture}&type=1`}
                            />
                          </div> :
                            <img src={image} width={200} height={200} />
                          }

                        </div>
                        <div className="col-md-6">

                          <Form.Item name="radio" label="Gender" rules={[{
                            required: true,
                            message: 'Must select the Gender'
                          }]} >
                            <Radio.Group  >
                              <Radio value="Male"  >Male</Radio>
                              <Radio value="Female" >Female</Radio>
                              <Radio value="Other" >Other</Radio>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item name="dob" label="Date Of Birth" rules={[{
                            required: true,
                            message: 'Must select the DOB'
                          }]}>
                            <DatePicker />
                            {/* <input type="date" value={`${detail.dob}`} /> */}
                          </Form.Item>
                          <Form.Item name="exdate" label="Experience Start Date"
                            rules={[{
                              required: true,
                              message: 'Must select the Experience Start Date'
                            }]}>
                            <DatePicker disabledDate={(current) => {
                              return moment().add('days') <= current ||
                                moment().add(1, 'month') <= current;
                            }} />
                          </Form.Item>
                          <Form.Item name="state" rules={[{
                            required: true,
                            message: 'Must select the State'
                          }]}>
                            <Select showSearch placeholder="Select Your State" onChange={e => getAllCity(e)} >
                              {items.map(({ label, value }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>))}
                            </Select>
                          </Form.Item>
                          <Form.Item name="city" rules={[{
                            required: true,
                            message: 'Must select the City'
                          }]}>
                            <Select placeholder={cityName} showSearch >
                              {city}
                            </Select>
                          </Form.Item>
                          <Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary">Update</Button>
                        </div>
                      </div>
                    </Form>
                  </TabPane>
                  <TabPane tab="Specialization & Degrees" key="2">
                    <Form name="register" initialValues={{ remember: true }} onFinish={onSpecialization} ref={docRef} encType="multipart/form-data">
                      <Form.Item name="specialization" rules={[{
                        required: true,
                        message: 'Must select the Specialization'
                      }]}>
                        <Select showSearch defaultValue={docSp} placeholder="Select your specialization">
                          {specialization.map(({ specialization, specializationMaster_Id }) => (
                            <option key={specializationMaster_Id} value={specializationMaster_Id}>
                              {specialization}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="degree" rules={[{
                        required: true,
                        message: 'Must select the Doctor Degree'
                      }]}>
                        <Select showSearch defaultValue={doc} placeholder="Select your degree">
                          {degree.map(({ degree, degreeMaster_Id }) => (
                            <option key={degreeMaster_Id} value={degreeMaster_Id}>
                              {degree}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="degreeimage" label="Upload Degree" rules={[{
                        required: true,
                        message: 'Must Upload the Degree'
                      }]}>
                        <input type="file" />
                      </Form.Item>
                      <div>
                        <img name="image" width={200} height={200}
                          src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${detail.profilePicture}&type=3`}
                        />
                      </div>
                      <Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary">Update</Button>
                    </Form>
                  </TabPane>
                </Tabs>

              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div >
  );
}

export default withRouter(DoctorDetail)