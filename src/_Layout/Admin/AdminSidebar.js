import React from "react";
import { Link } from 'react-router-dom';


export default function AdminSidebar()
{
    return(
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Brand Logo --> */}
            <a href="index3.html" className="brand-link">
                <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}}/>
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            {/* <!-- Sidebar --> */}
            <div className="sidebar">
            {/* <!-- Sidebar user panel (optional) --> */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
                </div>
                <div className="info">
                    <a href="#" className="d-block">Alexander Pierce</a>
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
                            <i class="fas fa-archway nav-icon"></i>
                            <p> State </p>
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
