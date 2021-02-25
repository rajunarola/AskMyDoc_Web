import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col, Row, Layout } from 'antd';
import './doctordashboard.css';
import { GetDoctorDashboardData } from '../Service/DoctorService';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';

function Doctordashboard(props) {
  const { Content } = Layout;
  const [data, setData] = useState({
    todayappointment: "",
    totalappointment: "",
    totalpatient: "",
    totalupcomingappointments:""
  });
  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      props.history.push('/doctor')
    }
    if (localStorage.getItem('AccessToken') !== null) {
      props.history.push('/admin/admindashboard')
    }
    GetDoctorDashboardData()
      .then(res => {
        console.log(res);
        setData({
          todayappointment: res.data.result.todaysAppointment,
          totalappointment: res.data.result.totalAppointment,
          totalpatient: res.data.result.totalPatient,
         totalupcomingappointments:res.data.result.totalUpcomingAppointments
        })
      })
  },[])
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
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8}>
                  <Card style={{ backgroundColor: 'skyblue', color: 'white' }} hoverable={true} title="Today's Appointments" >
                    <p style={{ fontSize: '20px' }}>{data.todayappointment}<i class="fas fa-calendar-check fa-2x" style={{ float: 'right' }}></i></p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ backgroundColor: '#30B0D3', color: 'white' }} hoverable={true} title="No of Upcoming Appointments">
                    <p style={{ fontSize: '20px' }}>{data.totalupcomingappointments}<i class="fas fa-calendar fa-2x" style={{ float: 'right' }}></i></p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ backgroundColor: '#FDD831', color: 'white' }} hoverable={true} title="No.of Patients" >
                    <p style={{ fontSize: '20px' }}>{data.totalpatient}<i class="fas fa-user fa-2x" style={{ float: 'right' }}></i></p>
                  </Card>
                </Col>
              </Row>
              <p></p>
              <Row gutter={16}>
                <Col span={8}>
                <Card style={{ backgroundColor: '#FF7F50', color: 'white' }} hoverable={true} title="Total Appointment" >
                    <p style={{ fontSize: '20px' }}>{data.totalappointment}<i class="fas fa-user fa-2x" style={{ float: 'right' }}></i></p>
                  </Card>
                </Col>
              </Row>



            </div>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(Doctordashboard)