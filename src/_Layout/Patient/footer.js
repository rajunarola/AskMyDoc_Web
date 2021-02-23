import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { withRouter } from "react-router-dom";
import { Footer } from 'antd/lib/layout/layout';


function footer(props)
{
  

  
    return (
      <div>
       <Footer style={{backgroundColor:'#343a40',color:'white'}}>
            <center>Copy Right &copy; All Right Reserved</center>
       </Footer>
      </div>
    );
}
export default withRouter(footer);