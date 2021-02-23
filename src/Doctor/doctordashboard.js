import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import './doctordashboard.css';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';

function Doctordashboard(props) {
  const { Content } = Layout;
  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      props.history.push('/')
    }
    if (localStorage.getItem('AccessToken') !== null) {
      props.history.push('/admin/admindashboard')
    }
  })
  return (

    <Layout>
      <DoctorHeader />
      <Layout>
        <SidePanel />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(Doctordashboard)