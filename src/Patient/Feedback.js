import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Rate, Input, Button, message, Form, notification } from 'antd';
import logo from '../assests/image/logo1.png';
import bgimg from "../assests/image/d6.jpg";
import bg from "../assests/image/d4.png";
const { TextArea } = Input;

export const Feedback = (props) => {

    const [value, SetValue] = useState(0);

    const OnFinishFailed = (values) => {
        console.log('success', values);
        notification.error({
            message: "Please Fill All The Fields", className: 'custom-class',
            style: {
                marginTop: '20vh',
            }
        })
    }

    const onFinish = async (values) => {
        const feedbackData = {

        }
    }

    return (
        <div className="container" style={{ alignContent: "center", padding: "10px", width: "40%" }}>
            <div style={{ border: "solid 2px lightgray", backgroundColor: "white" }}>
                <div className="row" style={{ padding: "10px" }}>
                    <div className="col-6">
                        <img src={logo}></img>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }} >
                        <div >
                            <img src={bg} style={{ height: "50px", width: "50px" }}></img>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ padding: "15px" }}>
                    <div className="col-3" style={{ backgroundColor: "rgb(197,43,46)", height: "10px" }} ></div>
                    <div className="col-9" style={{ backgroundColor: "rgb(0,119,142)", height: "10px" }} ></div>
                </div>
                <Form name="feedback" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={OnFinishFailed}>

                    <div className="row" style={{ textAlign: "center" }}>
                        <div className="col-12">
                            <h5>We would like your feedback to improve our website</h5>
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <img src=" https://i.imgur.com/d2dKtI7.png" height="100" width="100"></img>
                    </div>
                    <div className="row" style={{ textAlign: "center" }}>
                        <div className="col-12">
                            <Form.Item name="rate"
                                rules={[{
                                    required: true,
                                    message: 'Must Fill the rati'
                                }]}>
                                <h4>Rate the Doctor : </h4>
                                <Rate allowHalf style={{ fontSize: "30px", backgroundColor: "lightgray" }} />
                            </Form.Item>
                            {/* <Rate allowHalf style={{}} /> */}
                        </div>
                    </div>
                    <div className="row" style={{ textAlign: "center", padding: "20px", paddingBottom: "0px" }}>
                        <div className="col-12">
                            <Form.Item name="review"
                                rules={[{
                                    required: true,
                                    message: 'Must Fill the rati'
                                }]}>
                                <h4>Please leave your feedback below : </h4>
                                <TextArea placeholder="Feedback details" style={{ height: "200px", fontSize: "20px", border: "none", backgroundImage: "url(" + bgimg + ")", width: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></TextArea>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "0px", paddingRight: "20px" }}>
                        <div className="col-6"></div>
                        <div className="col-6" style={{ textAlign: "right" }}>
                            <Button style={{ backgroundColor: "rgb(0,119,142)", color: "white" }} size="large">Submit</Button>
                        </div>
                    </div>
                </Form>


                <div className="row" style={{ padding: "15px" }}>
                    <div className="col-3" style={{ backgroundColor: "rgb(197,43,46)", height: "30px" }} ></div>
                    <div className="col-9" style={{ backgroundColor: "rgb(0,119,142)", height: "30px" }} >

                    </div>
                </div>
            </div>
        </div >

    )
}
export default withRouter(Feedback);