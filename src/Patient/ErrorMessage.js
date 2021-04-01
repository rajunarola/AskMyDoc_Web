import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from 'antd';
import logo from "../assests/image/logo1.png";
import bgimg from "../assests/image/bg.png";

function ErrorMessage() {
    return (
        <div class="bgimg" style={{
            backgroundImage: "url(" + bgimg + ")", height: "789px", width: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }}>
            <div class="topleft">
                {/* <p style={{ position: "fixed", top: 0, left: "16px" }}>AskMyDoc</p> */}
            </div>
            <div class="middle" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <img src={logo}></img>
                <h2 style={{ textShadow: "2px 7px 5px rgba(0, 0, 0, 0.3)", fontFamily: "Cambria, Cochin, Georgia, Times, serif" }}>Sorry you can not join the meeting right now..!!</h2>
                <h3 style={{ textShadow: "2px 7px 5px rgba(0, 0, 0, 0.3)", fontFamily: "Cambria, Cochin, Georgia, Times, serif" }}>Please Wait for your scheduled date and time..!!</h3>
                <Button type="primary" href="/">Home</Button>
            </div>
            <div class="bottomleft">
                {/* <p style={{ position: "absolute", bottom: 0, left: "16px" }}>Thank You</p> */}
            </div>
        </div >
    )
}
export default withRouter(ErrorMessage);