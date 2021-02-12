import React from 'react';
import { Layout, Menu, Breadcrumb, Tooltip } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingFilled, FormOutlined } from '@ant-design/icons';
import './doctordashboard.css';
import DoctorHeader from './DoctorHeader';
import SidePanel from './SidePanel';
import AppointmentBadge from './AppointmentBadge';

export default function doctordashboard() {
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
           
          {/* <AppointmentBadge/> */}
        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}