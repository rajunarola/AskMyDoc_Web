import React from "react";

export default function AdminHeader()
{
return(
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
      <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      </ul>


      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-user"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a id="Adminlogout" className="dropdown-item">
            <i className="fas fa-logout mr-2"></i> Logout
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