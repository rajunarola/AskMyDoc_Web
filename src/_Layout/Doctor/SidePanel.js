import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Tooltip } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingFilled, FormOutlined } from '@ant-design/icons';


function SidePanel(props) {
  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      props.history.push('/')
    }
  })

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  return (
    <div>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1"><Link to="/doctor/doctordashboard">Home</Link></Menu.Item>

          <Menu.Item key="2" icon={<LaptopOutlined />}><Link to="/doctor/timeslots">Time Slot</Link> </Menu.Item>

          <SubMenu key="sub2" icon={<UserOutlined />} title="Patient">
            <Menu.Item key="3"><Link to="/doctor/patientlist">Patient Lists</Link></Menu.Item>

          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Appointments">
            <Menu.Item key="4"><Link to="/doctor/appointmentdetails"></Link> Appointment Lists</Menu.Item>

          </SubMenu>

          <Menu.Item key="5" icon={<FormOutlined />}><Link to="/doctor/objectionform">No Objection Form</Link> </Menu.Item>

          {/* <SubMenu key="sub4" icon={<FormOutlined />} title="No Objection" >
            <Menu.Item key="5"></Menu.Item>
            <Link to="/doctor/objectionform"></Link>
          </SubMenu> */}
        </Menu>
      </Sider>
    </div>
  );

}
export default withRouter(SidePanel)

