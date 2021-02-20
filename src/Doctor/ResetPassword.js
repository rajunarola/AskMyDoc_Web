import React from 'react';
import ReactDom from 'react-dom';
import { Form, Input,Button } from 'antd';
import { LockOutlined,  EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

function ResetPassword()
{
    const [loading,setLoading] = React.useState();
    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFinish=(values)=>{
        setLoading(true)
       
        .catch(function(errormsg){
console.error(errormsg);
        });
      
    }

    return(
        <div className="container-fluid register">
        <div className="row">
            <div className="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                <h3 style={{color:'white'}}>Welcome To</h3>
                <h2 style={{color:'white'}}>Ask My Doc</h2>
                <p style={{color:'white'}}>"LIVE FOR OTHERS IS THE WORTHFUL LIFE"</p>
            </div>

            <div className="col-md-9 register-right">

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 className="register-heading">Forgot Password</h3>
                        <div className="row register-form">
                            <div className="col-md-9">
                            <Form>
                        
                        <label><span style={{color:"red"}}>*</span>New Password</label>
                        <Form.Item
                    
                          name="newpassword"
                          hasFeedback
                          rules={[
                            { required: true, message: 'Please input your new password!' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newpassword').length>6 && getFieldValue('newpassword').length<10) {
                                  return Promise.resolve();
                                }
                              
                                return Promise.reject('password between 6 to 10 charecter');
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

    </div>
    )
}
export default withRouter(ResetPassword)