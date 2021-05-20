import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { message, Input, Button, Modal } from "antd";
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import { checkAppointmentDetail, noobjectionaccept, updateAppoinment, GetScoketId, updateEndCall } from '../Service/PatientService';
import './Meeting.css';
import logo from '../assests/image/logo1.png';
import bgimg from "../assests/image/d6.jpg";
import bg from "../assests/image/d4.png";

const { TextArea } = Input;
const socket = io.connect('https://vivek-webrtc-test2.herokuapp.com');

function Meeting(props) {
    const [stream, setStream] = useState()
    const [me, setMe] = useState("")
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [name, setName] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callerType, SetCallerType] = useState("");
    const [visible, Setvisible] = useState(false);
    const [Prescription, setPrescription] = useState(false);
    const [patientid, Setpatientid] = useState(0);
    const [patientemail, Setpatientemail] = useState("");
    const [isCall, SetIsCall] = useState(false);
    const [doctorid, SetDoctorid] = useState("");
    const [appointmentId, SetAppointmentId] = useState();
    const [socketKey, SetSocketKey] = useState("");

    const [appointmentData, SetAppointmentData] = useState([]);

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()


    useEffect(() => {
        // console.log("token", props.location.search.split("&")[0].split("=")[1]);
        // SetCallerType(props.location.search.split("&")[1].split("=")[1]);
        // SetAppointmentId(props.location.search.split("&")[2].split("=")[1]);

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            setStream(stream)
            debugger
            myVideo.current.srcObject = stream
            // window.onload = true;
        })

        socket.on("me", async (id) => {
            setMe(id)
            console.log('me => ', id);
            // await new Promise(r => setTimeout(r, 2000));
            console.log('me => ', me);
            checkAppointmentDetail(props.location.search.split("&")[0].split("=")[1], props.location.search.split("&")[2].split("=")[1])
                .then(res => {
                    console.log('res => ', res);
                    //debugger
                    if (res.data.status === "UnAuthorized") {
                        props.history.push('/');
                        message.error({ content: "Your Session Has Been Expire Or Your Allocated Time Has Been Over" });
                    }
                    if (res.data.status === "Failed") {
                        message.error({ content: "Please Wait for your scheduled date and time" })
                        props.history.push('/ErrorMessage')
                    }

                    if (res.data.status === "Success") {
                        console.log('res.data.result no objection => ', res.data.result);
                        setName(res.data.result.patientName);
                        Setpatientemail(res.data.result.email);
                        Setpatientid(res.data.result.patientid)
                        SetIsCall(res.data.result.isCall);
                        SetDoctorid(res.data.result.doctorid);

                        SetAppointmentData(res.data.result.doctorAppointmentList);

                        console.log(res.data.result.email);
                        console.log(res.data.result.email);
                        console.log(res.data.result.patientid)
                        console.log(res.data.result.isCall);
                        //console.log(res.data.result.appointmentId);
                        console.log(res.data.result.doctorid);


                        if (res.data.result.aaa === false) {
                            message.error({ content: "Please first fill the no objection form" })
                            // SetIsCall(res.data.result.isCall);
                            // SetDoctorid(res.data.result.doctorid);
                            Setvisible(true);
                        }

                        if (res.data.result.isCall === false) {
                            console.log("hello false");
                            updateAppoinment(props.location.search.split("&")[2].split("=")[1], id, props.location.search.split("&")[1].split("=")[1], true).then(res => {
                                console.log(res);
                                if (res.data.status === "Success") {
                                    GetScoketId(props.location.search.split("&")[2].split("=")[1], true).then(res => {
                                        console.log("SetSocketKey ", res.data.result);
                                        debugger
                                        setIdToCall(res.data.result);
                                        // callUser(res.data.result);
                                    })
                                }
                            })
                        } else {
                            console.log("hello true");
                            GetScoketId(props.location.search.split("&")[2].split("=")[1], true).then(res => {
                                console.log("SetSocketKey " + res);
                                debugger
                                setIdToCall(res.data.result);
                                // callUser(res.data.result);
                            })
                        }
                    }
                })
                .catch(function (err) {
                    console.log("Error Checking=>", err);
                    //props.history.push('/');
                    //window.location.reload();
                })
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            // setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const handleOk = () => {
        Setvisible(false);

        message.success({ content: "you can join the meeting now." })
        console.log("this is patient id=>", patientid);
        noobjectionaccept(patientid).then(res => {

            console.log("patientid res=>", res);

            if (isCall == "false") {
                updateAppoinment(appointmentId, me, callerType, true).then(res => {
                    console.log(res);
                })
            }
            GetScoketId(appointmentId, true).then(res => {
                SetSocketKey(res.data.result);
            })

        });
    };

    const handleCancel = () => {
        Setvisible(false);
        props.history.push('/')
        message.error({ content: "Accept the Agremment To Continue..." })
    };

    const closeForm = () => {
        setPrescription(false);
        props.history.push('/')
    }

    debugger
    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            debugger;
            console.log("sk", idToCall);

            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
            // setStream(stream);
            debugger;
        })
        peer.on("stream", (stream) => {
            debugger
            userVideo.current.srcObject = stream
        })
        socket.on("callAccepted", (signal) => {
            debugger;
            setCallAccepted(true)
            peer.signal(signal)
        })
        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            debugger
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {

        updateEndCall(props.location.search.split("&")[2].split("=")[1], props.location.search.split("&")[1].split("=")[1], false).then(res => {
            console.log(res);
        })

        setCallEnded(true)
        connectionRef.current.destroy()
        setPrescription(true)
    }

    return (
        <>
            {/* <h1 style={{ textAlign: 'center' }}>Consultion Meeting Room</h1> */}
            <div className="row" style={{ width: "100%", border: "2px solid black" }}>
                <div className="col-9">
                    <div className="container_main">
                        <div className="vcontainer">
                            <div>
                                {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "50%", height: "500px", border: "2px solid black" }}></video>}
                            </div>

                            <br />
                            <div>
                                {/* <video autoPlay="true" style={{ width: "50%", height: "375px" }}>

                                </video> */}
                                {callAccepted && !callEnded ?

                                    <video playsInline ref={userVideo} autoPlay style={{ width: "100%", border: "2px solid black" }}></video>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="myClass">
                            <TextArea
                                label="Name"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                                style={{ marginBottom: "20px", marginTop: "20px", height: "70px" }}
                                placeholder="Enter Your Name Here">
                            </TextArea>

                            {/* <CopyOutlined text={me} style={{ marginBottom: "2rem" }}>
                        <Button type="primary"> <CopyOutlined color="white" />&nbsp; Copy ID</Button>
                    </CopyOutlined> */}

                            <TextArea
                                label="ID to Call"
                                value={idToCall}
                                style={{ height: "70px" }}
                                onChange={(e) => setIdToCall(e.target.value)}
                                placeholder="Enter Your Id Here">
                            </TextArea>
                            <div className="Call">
                                {callAccepted && !callEnded ? (
                                    <Button type="danger" onClick={leaveCall}>End Call</Button>
                                ) : (
                                        <Button type="primary" className="callButton" type="primary" onClick={() => callUser(idToCall)}> <PhoneOutlined color="white" /></Button>
                                    )}
                                <div style={{ color: "white" }}>
                                    {idToCall}
                                </div>
                            </div>
                        </div>
                        <div>
                            {receivingCall && !callAccepted ? (
                                <div className="callAnswer">
                                    <h1>{name} is calling..</h1>
                                    <Button type="primary" className="answerButton" onClick={answerCall}><PhoneOutlined color="white" />&nbsp; Answer</Button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>


                <div className="col-3" style={{ border: "2px solid black", backgroundColor: "lightgray" }}>
                    <h3 style={{ textAlign: "center" }}>Appointment List</h3>
                    <div style={{ backgroundColor: "rgb(197,43,46)", height: "5px" }} ></div>

                    {appointmentData.map((item => {
                        return (
                            <div className="row">
                                <div>{item.patientName}</div>
                                <Button>Add Me</Button>
                            </div>

                        )
                    }))}
                </div>
                <Modal
                    visible={visible}
                    title="No Objection Form"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    maskClosable={false}
                    footer={[
                        <Button key="Accept" type="primary" onClick={handleOk}>
                            Accept
                    </Button>,
                        <Button type="primary" onClick={handleCancel}>
                            Cancel
                    </Button>,
                    ]}>
                    <h2></h2>
                    <div className="divborder">
                        <center>
                            <h1 style={{ color: "darkblue" }}>NO OBJECTION CERTIFICATE </h1>
                            <p> This Document is Given Too </p>
                            <h3 style={{ color: "darkblue" }}> Patient Name </h3>
                            <p className="pfont psetcenter"> Paragram of No objection Cerificate
                            "A NOC may also be required to get governmental permission to construct a new building,
                            or to refit or renovate an existing one. They may be requested from an employer
                            when an employee wishes to switch to another job.As a legal document, a no objection certificate
                            often holds a great deal of significance for different legal tasks and procedures,
                            and can be requested by agencies or individuals."
                                                                </p>
                            <p className="pfont">Date :{new Date().toLocaleString() + ''}</p>
                        </center>
                    </div>
                </Modal>

                <Modal
                    visible={Prescription}
                    title="Prescription Form"
                    // onOk={handleOk}
                    onCancel={closeForm}
                    maskClosable={false}
                    width="60%">
                    <div className="container" style={{ alignContent: "center", padding: "10px", backgroundColor: "whitesmoke", width: "80%" }}>
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
                </Modal>
            </div>

        </>
    )
}

export default withRouter(Meeting);