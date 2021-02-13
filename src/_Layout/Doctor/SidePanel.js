import React,{useEffect} from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb,Tooltip } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,SettingFilled,FormOutlined } from '@ant-design/icons';
import './doctordashboard.css';

 function SidePanel(props)
{
  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
        props.history.push('/')
    }
  })

    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return(
        <div>
            <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<LaptopOutlined />} title="Time Slot">
          <Menu.Item key="1"><Link to="/doctor/appointmentdetails">Home</Link></Menu.Item>
            <Menu.Item key="2">Availability Time Slot</Menu.Item>
            
         
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Patient">
            <Menu.Item key="3"><Link to="/doctor/patientlist">Patient List</Link></Menu.Item>
       
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Appointments">
            <Menu.Item key="4">Appointment List</Menu.Item>
           
          </SubMenu>
          <SubMenu key="sub4" icon={<FormOutlined />} title="No Objection">
            <Menu.Item key="5">Form</Menu.Item>
        
          </SubMenu>
        </Menu>
      </Sider> 
        </div>
    );

}
export default withRouter(SidePanel)

      