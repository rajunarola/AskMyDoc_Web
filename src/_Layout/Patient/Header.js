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
import Avatar from 'antd/lib/avatar/avatar';
import LOGO from '../../akymydoclogo.png';


function Header(props)
{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/"><i class="fas fa-user-md"></i> ASK MY DOC</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink style={{color:'white'}}>Find Doctors</NavLink>
              </NavItem>
              <NavItem>
                
              </NavItem>
              
            </Nav>
            <NavbarText ></NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
}
export default withRouter(Header);