import React from 'react';
import { withRouter } from "react-router-dom";
import {checkemailavailability} from '../Service/DoctorService';
import { Form, Input, Radio, DatePicker, Upload, notification, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, HistoryOutlined, UploadOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import './DoctorSignin.css';


export const DoctorForgotPwd = (props) => {
    const [loading,setLoading] = React.useState();
    const [value, setValue] = React.useState(1);
    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFinish=(values)=>{
        setLoading(true)
        checkemailavailability(values.email)
        .then(res=>{
            if(res.data.status=="Success")
            {
                notification.success({message:'Reset Password Link Has been Sent To Your Email.!'})
                setLoading(false)
            }
            else
            {
                notification.error({message:res.data.message})
                setLoading(false)

            }
        })
        .catch(function(errormsg){
            console.error(errormsg);
            setLoading(false);
        });
      
    }

    return (
        <div className="container-fluid register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                    <h3>Welcome To</h3>
                    <h2>Ask My Doc</h2>
                    <p>"LIVE FOR OTHERS IS THE WORTHFUL LIFE"</p>
                </div>

                <div className="col-md-9 register-right">

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 className="register-heading">Forgot Password</h3>
                            <div className="row register-form">
                                <div className="col-md-9">
                                    <Form onFinish={onFinish} name="register" initialValues={{ remember: false }}>
                                        <Form.Item name="email" label="Email" rules={[{
                                            required: true,
                                            
                                            message: 'Must Enter the Email.'
                                        },
                                        {
                                            type:'email',
                                            message:'Please Enter Valid Email'
                                        },]}>
                                            <Input allowClear />
                                        </Form.Item>
                                  
                                        <Button type="primary" className="col-lg-4" htmlType="submit" loading={loading} >Send</Button>
                                      
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
