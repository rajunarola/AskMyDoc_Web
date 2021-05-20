import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../assests/image/logo1.png';
import bgimg from "../assests/image/d6.jpg";
import bg from "../assests/image/d4.png";

function DocMeeting() {
    return (

        <div className="main">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 p-0">
                        <div className="video-wrapper" style={{
                            height: "100vh", position: "relative", backgroundcolor: "#333"
                        }}>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/2c6HDkcJ0LI?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div className="docotor-name" style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                padding: "15px",
                                background: "#19000078",
                                background: "rgb(0, 0, 0)",
                                // background: "linear - gradient(-90deg, rgba(0, 0, 0, 0) 0 %, rgba(25, 0, 0, 1) 100 %)",
                                color: "#fff",
                                width: "50 %"
                            }}>
                                <h6>John Doe</h6>
                            </div>
                            <div className="appointer-window" style={{ position: "absolute", top: "0", right: "0", width: "30%", height: "25%" }}>
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/iGpuQ0ioPrM?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 p-0 appointment-list-wrapper" style={{ height: "100vh", overflowY: "auto", position: "relative" }}>
                        <h3 className="appointment-ttl" style={{ padding: "10px 20px", color: "#333", position: "sticky", top: 0, backgroundcolor: "#fff" }} >Appointments</h3>
                        <div className="appointment-list" style={{ padding: "20px" }}>
                            <div className="appointment-tile" style={{
                                border: "1px solid #222", padding: "20px 10px",
                                borderRadius: "10px", display: "flex",
                                transition: "all 0.3s ease-in", margin: "20px 0",
                                boxShadow: "0 0 10px #ccc"
                            }}>

                                <div className="appointment-details">
                                    <h6>John Doe</h6>
                                    <span className="status on" style={{ color: "green" }}>Online</span>
                                    <h6 className="time">Timing: <span>10:00 To 12:00</span></h6>
                                    <a className="btn btn-dark" href="#">Add Call</a>
                                </div>
                            </div>
                            <div className="appointment-tile" style={{
                                border: "1px solid #222", padding: "20px 10px",
                                borderRadius: "10px", display: "flex",
                                transition: "all 0.3s ease-in", margin: "20px 0",
                                boxShadow: "0 0 10px #ccc"
                            }}>

                                <div className="appointment-details">
                                    <h6>John Doe</h6>
                                    <span className="status off">Ofline</span>
                                    <h6 className="time">Timing: <span>10:00 To 12:00</span></h6>
                                    <a className="btn btn-dark" href="#">Add Call</a>
                                </div>
                            </div>
                            <div className="appointment-tile" style={{
                                border: "1px solid #222", padding: "20px 10px",
                                borderRadius: "10px", display: "flex",
                                transition: "all 0.3s ease-in", margin: "20px 0",
                                boxShadow: "0 0 10px #ccc"
                            }}>
                                <div className="appointment-details">
                                    <h6>John Doe</h6>
                                    <span className="status on" style={{ color: "green" }}>Online</span>
                                    <h6 className="time">Timing: <span>10:00 To 12:00</span></h6>
                                    <a className="btn btn-dark" href="#">Add Call</a>
                                </div>
                            </div>
                            <div className="appointment-tile" style={{
                                border: "1px solid #222", padding: "20px 10px",
                                borderRadius: "10px", display: "flex",
                                transition: "all 0.3s ease-in", margin: "20px 0",
                                boxShadow: "0 0 10px #ccc"
                            }}>
                                <div className="appointment-details">
                                    <h6>John Doe</h6>
                                    <span className="status on" style={{ color: "green" }}>Online</span>
                                    <h6 className="time">Timing: <span>10:00 To 12:00</span></h6>
                                    <a className="btn btn-dark" href="#">Add Call</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default withRouter(DocMeeting);