import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Tabs, Form, Input, Radio, DatePicker, Button, Select, notification } from 'antd';
import { UserOutlined, LockOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './doctordashboard.css';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';
import { Content } from 'antd/lib/layout/layout';

export const noObejctionForm = () => {
    return (
        <div>
            <Layout>
                <DoctorHeader />
                <Layout>
                    <SidePanel />
                    <Layout>
                        <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 290, }}>
                            <div className="site-card-wrapper">
                                <section className="content">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="card">

                                                    <div className="card-body">


                                                        <div className="divborder" >
                                                            <center>
                                                                <h1 className="themefont">NO OBJECTION CERTIFICATE </h1>
                                                                <p className="pfont"> This Document is Given Too </p>
                                                                <h1 className="themefont"> Patient Name </h1>
                                                                <p className="pfont psetcenter"> Paragram of No objection Cerificate
                                                                "A NOC may also be required to get governmental permission to construct a new building,
                                                                or to refit or renovate an existing one. They may be requested from an employer
                                                                when an employee wishes to switch to another job.As a legal document, a no objection certificate
                                                                often holds a great deal of significance for different legal tasks and procedures,
                                                                and can be requested by agencies or individuals."
                                                                    </p>
                                                                <p className="pfont"> Given Date </p>

                                                            </center>
                                                        </div>
                                                        <center>
                                                            <div style={{ margin: "20" }}>
                                                                <Button type="primary">Accept</Button> &nbsp; &nbsp; &nbsp;
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
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div >
    )
}
export default withRouter(noObejctionForm)