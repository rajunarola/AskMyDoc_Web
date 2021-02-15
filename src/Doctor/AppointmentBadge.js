import React,{useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { message,Menu, Card, Col, Row,Layout } from 'antd';
import DoctorHeader from '../_Layout/Doctor/DoctorHeader';
import SidePanel from '../_Layout/Doctor/SidePanel';

function AppointmentBadge(props) {

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
                            }}
                        >
                            <div className="site-card-wrapper">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card title="Today's Appointments" >
                                            5
        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title="Total Appointments">
                                            10
        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title="No.of Patients" >
                                            15
        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}
export default withRouter(AppointmentBadge)