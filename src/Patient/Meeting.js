import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { message, Input, Button } from "antd";
import { PhoneOutlined } from '@ant-design/icons';
import { useParams, withRouter } from "react-router-dom";
import { checkAppointmentDetail } from '../Service/PatientService';


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

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        console.log('CheckToken=>', props.location.search.split("=")[1]);
        checkAppointmentDetail(props.location.search.split("=")[1])
            .then(res => {
                console.log('res => ', res);
                if(res.data.status==="UnAuthorized")
                {
                    props.history.push('/');
                    message.error({content:"Your Session Has Been Expire Or Your Allocated Time Has Been Over"});
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
        const peer = new peer({
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
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "350px" }}></video>}
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

                </div>
            </div>
        </>

    )
}

export default withRouter(Meeting);