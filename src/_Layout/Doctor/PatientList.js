import React from 'react';
import { Layout, Menu } from 'antd';
import './doctordashboard.css';
import DoctorHeader from './DoctorHeader';
import SidePanel from './SidePanel';


export default function PatientList() {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return (

        <div>
            <Layout>

                <DoctorHeader/>

                <Layout>
                <SidePanel/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                   
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <p>Patient List</p>
        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}