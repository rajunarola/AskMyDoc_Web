import React from 'react';
import Header from '../_Layout/Patient/Header';
import Footer from '../_Layout/Patient/footer';
import DoctorList from '../Patient/DoctorList';
import { Layout, Breadcrumb } from 'antd';
import shadows from '@material-ui/core/styles/shadows';

function LandingPage() {
    const { Headers, Content, Sider } = Layout;
    return (
        <div>
            <Header />
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 660,
                }}

            >
                <Breadcrumb style={{ margin: '16px 0', padding: '20px', backgroundColor: '#2980B9', color: 'white' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>DoctorList</Breadcrumb.Item>

                </Breadcrumb>
                <div>
                    <DoctorList />
                </div>
            </Content>
            <Footer />

        </div>
    )

}
export default LandingPage