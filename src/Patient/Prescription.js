import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../assests/image/logo1.png';
import bgimg from "../assests/image/d6.jpg";
import bg from "../assests/image/d4.png";

const { TextArea } = Input;
function Prescription() {
    return (
        <div className="container" style={{ alignContent: "center", padding: "10px", backgroundColor: "whitesmoke", width: "60%" }}>
            <div style={{ border: "solid 2px lightgray", backgroundColor: "white" }}>
                <div className="row" style={{ padding: "10px" }}>
                    <div className="col-6">
                        <img src={logo}></img>
                    </div>
                    <div className="col-6" style={{ textAlign: "right" }} >
                        <div >
                            <img src={bg} style={{ height: "50px", width: "50px" }}></img>
                            <h5 >Your Address</h5>
                            <h5 >City, State, Zip</h5>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ padding: "15px" }}>
                    <div className="col-3" style={{ backgroundColor: "rgb(197,43,46)", height: "15px" }} ></div>
                    <div className="col-9" style={{ backgroundColor: "rgb(0,119,142)", height: "15px" }} ></div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                    <div className="col-6">
                        <h6 ><i className="fas fa-user-md"></i> Dr. jalpa makvana </h6>
                        <h6 ><i className="fas fa-stethoscope" ></i> M.D Doctor of Medicine</h6>
                        <h6 ><i className="fas fa-user-graduate" ></i> Neurologist</h6>
                    </div>
                </div>
                <div className="row" style={{ paddingLeft: "30px", paddingRight: "30px", paddingTop: "5px" }}>
                    <TextArea placeholder="Prescription details" style={{ height: "400px", fontSize: "20px", border: "none", backgroundImage: "url(" + bgimg + ")", width: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></TextArea>
                </div>

                <div className="row" style={{ padding: "15px" }}>
                    <div className="col-3" style={{ backgroundColor: "rgb(197,43,46)", height: "50px" }} ></div>
                    <div className="col-9" style={{ backgroundColor: "rgb(0,119,142)", height: "50px" }} >
                        <div className="row" style={{ color: "white", fontSize: "20px", paddingTop: "15px", paddingLeft: "20px" }}>
                            <PhoneOutlined />&nbsp;
                            <h6 style={{ color: "white", paddingTop: "1px" }}>9904397020</h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MailOutlined />&nbsp;
                            <h6 style={{ color: "white" }}>jhm@narola.email</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default withRouter(Prescription);