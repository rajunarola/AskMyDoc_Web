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
                                                    <div className="card-header">
                                                        <h3 className="card-title" style={{ color: 'black' }}>No Objection Certificate</h3>
                                                    </div>
                                                    <div className="card-body">

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
        </div>
    )
}
export default withRouter(noObejctionForm)