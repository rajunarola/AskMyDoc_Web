import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getDoctorDetail } from "../../Service/DoctorService";
import { Layout, Menu, Breadcrumb, Tooltip, Drawer, Image, notification, label, Button, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingFilled, FormOutlined, FolderViewOutlined } from '@ant-design/icons';
import '../../Doctor/doctordashboard.css';
import LOGO from '../../akymydoclogo.png';

function DoctorHeader(props) {

  const [detail, setDetail] = useState([]);

  React.useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      props.history.push('/')
    }
  })

  const getOneDetail = () => {
    setVisible(true);

    getDoctorDetail().then(res => {
      //console.log('res => ', res);

      if (res.data.status == "Success") {
        setDetail(res.data.result);
        //console.log('detail => ', detail);
      } else {
        notification.error({
          message: "UnAuthorized User or Maybe Token Expire Please Re-Login",
          content: res.data.message, className: 'custom-class',
          style: {
            marginTop: '20h',
          }
        })
      }
    }).catch(err => {
      notification.error({
        message: err,
        style: {
          marginTop: '20vh',
        }
      })
    })
  }

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  const [visible, setVisible] = useState(false);


  const onClose = () => {
    setVisible(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/doctor";
  }

  return (

    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1"> <img src={LOGO} /></Menu.Item>
            <Menu.Item key="2" onClick={logout} style={{ float: 'right' }}><SettingFilled />Logout</Menu.Item>
            <Menu.Item key="3" style={{ float: 'right' }} onClick={getOneDetail}>Welcome Dr. {localStorage.getItem("dcotorname")}</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
          </Layout>
        </Layout>
      </Layout>
      <Drawer
        title="Doctor Profile"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}

      >
        <div>
          <Image
            width={200}
            src={process.env.REACT_APP_SERVER_URL + `/Comman/GetFile?file=${detail.profilePicture}&type=1`}
          />

        </div>

        <p><b>Dr. {detail.fName} {detail.mName} {detail.lName}</b></p>
        <label for="Email">Email : {detail.email}</label>
        <br></br>
        <Link to="/doctor/doctordetail" className="btn btn-sm bg-info"><i class="far fa-eye"></i> View Detail</Link>
        <br></br>
        <br></br>
        <Link to="/doctor/changepassword" className="btn btn-sm bg-info"><i class="fas fa-unlock-alt"></i> Change Password</Link>
        {/* <Button type="dashed" onClick={onView}><FolderViewOutlined />View Detail</Button> */}
      </Drawer>
    </div>
  );
}
export default withRouter(DoctorHeader)