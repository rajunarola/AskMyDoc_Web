import React from "react";
import {Link} from 'react-router-dom';

export default function AdminHeader()
{
  const logout=()=>
{
  localStorage.clear();
  window.location.href="/admin";
}
return(
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
      <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      </ul>


      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ">
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-user"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-left">
          <a href="#" onClick={logout} className="dropdown-item">
            <i className="fas fa-logout mr-2"></i> Logout
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <Link to='/admin/changepassword'>
            <i className="fas fa-logout mr-2"></i> Change Password
            </Link>
          </a>
          <div className="dropdown-divider"></div>
        </div>
      </li>
      <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt"></i>
          </a>
      </li>
      </ul>
  </nav>
)
}