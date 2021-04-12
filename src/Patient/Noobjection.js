import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { checkAppointmentDetail } from '../Service/PatientService';

export const Noobejction = () => {
    const IsAccepted = () => {
        alert("Accepted");
    }
    return (
        <div>
            <>
                <div>
                    <div className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 290, }}>
                        <div className="site-card-wrapper">
                            <section className="content">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            <h1 style={{ textAlign: "center" }}>Please first fill the No objection form</h1>
                                            <div className="card" style={{ border: "5px solid darkblue" }}>
                                                <div className="card-body">
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
                                                            <p className="pfont">Date : 08-04-2021</p>
                                                        </center>
                                                    </div>
                                                    <center>
                                                        <div style={{ margin: "20" }}>
                                                            <Button type="primary" onClick={IsAccepted} >Accept</Button> &nbsp; &nbsp; &nbsp;
                                                                    <Button type="danger">Cancel</Button>
                                                        </div>
                                                    </center>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                </div >
            </>

        </div >

    )
}
export default withRouter(Noobejction);