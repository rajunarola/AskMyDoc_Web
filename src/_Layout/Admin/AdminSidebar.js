import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import {GetApprovalRequestCount} from '../../Service/AdminService';
import { Badge, Space, Switch } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export default function AdminSidebar()
{
    const [adminname,setAdminname]=useState();
    const [count,setCount]=useState();

    useEffect(() => {
        GetApprovalRequestCount()
        .then(res=>{
            setCount(res.data.result.requestcount)
        })
        setAdminname(localStorage.getItem('AdminEmail'))
      },[]);
      
    
    return(
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Sidebar --> */}
            <div className="sidebar">
            {/* <!-- Sidebar user panel (optional) --> */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
                </div>
                <div className="info">
                    <a href="#" className="d-block">{adminname}</a>
                </div>
            </div>

            {/* <!-- SidebarSearch Form --> */}
            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                    <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
                    <div className="input-group-append">
                        <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* <!-- Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library --> */}
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/admindashboard'>
                            <i className="nav-icon fas fa-tachometer-alt"></i>
                            <p> Dashboard </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/state'>
                            <i className="fas fa-archway nav-icon"></i>
                            <p> State </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/city'>
                            <i className="fas fa-archway nav-icon"></i>
                            <p> City </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/specialization'>
                            <i className="fas fa-user-md nav-icon"></i>
                            <p> Specialization </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/degree'>
                            <i className="fas fa-graduation-cap nav-icon"></i>
                            <p> Degree </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/approvalrequest'>
                            <i class="fas fa-paper-plane nav-icon"></i>
                            <p> Approval Request </p>
                            &nbsp;
                            <Badge
                            className="site-badge-count-109"
                            count={count}
                            style={{ backgroundColor: '#52c41a' }}
                            >

                            </Badge>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin/doctor'>
                            <i className="fas fa-user-md nav-icon"></i>
                            <p> Doctors </p>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* <!-- /.sidebar-menu --> */}
            </div>
            {/* <!-- /.sidebar --> */}
        </aside>
    
    )
}
