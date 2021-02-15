import React,{useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import './doctordashboard.css';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';


 function PatientList(props) {
  
  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
        props.history.push('/')
    }
  })
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
export default withRouter(PatientList)