import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { message, Input, Button } from "antd";
import { PhoneOutlined, CopyOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import { checkAppointmentDetail } from '../Service/PatientService';
import './Meeting.css';


const { TextArea } = Input;
const socket = io.connect('https://vivek-webrtc-test2.herokuapp.com');

function Meeting(props) {


    const [stream, setStream] = useState()
    const [me, setMe] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [name, setName] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [idToCall, setIdToCall] = useState("")

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        console.log('CheckToken=>', props.location.search.split("=")[1]);
        checkAppointmentDetail(props.location.search.split("=")[1])
            .then(res => {
                console.log('res => ', res);
                if (res.data.status === "UnAuthorized") {
                    props.history.push('/');
                    message.error({ content: "Your Session Has Been Expire Or Your Allocated Time Has Been Over" });
                }
                if (res.data.status === "Failed") {
                    message.error({ content: "Please Wait for your scheduled date and time" })
                    props.history.push('/ErrorMessage')
                }
            })
            .catch(function (err) {
                console.log(err)
            })

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on("me", (id) => {
            setMe(id)
            console.log("socket id : ", id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })
        socket.on("callAccepted", (signal) => {
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
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Consultion Meeting Room</h1>
            <div className="container">
                <div className="vcontainer">
                    <div>
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "350px", border: "2px solid black" }}></video>}
                    </div>
                    <br />
                    <div>
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "350px" }}></video>
                            : null
                        }
                    </div>
                </div>

                <div className="myClass">
                    <TextArea
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
        </>
    )
}

export default withRouter(Meeting);