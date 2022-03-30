import React, { FC, useState } from 'react';
import { Button, Collapse, Nav, Navbar as NavbarBase, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { ajax } from '~/helpers/ajax';

const AdminNavbar: FC = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const onClickLogout = async () => {
    await ajax.delete('/api/auth');
    location.reload();
  }

  return (
    <NavbarBase 
      className="rounded" 
      expand="md" 
      color="light" 
      full
      light
    >
      <NavbarBrand>
        Velasquez Gym
      </NavbarBrand>
      <NavbarToggler onClick={() => setNavbarOpen(!isNavbarOpen)}/>
      <Collapse isOpen={isNavbarOpen} navbar>
        <Nav className="me-auto flex-grow-1" navbar>
          <NavItem>
            <NavLink href="/admin/summary">
              Summary of Report
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/fitness">
              Fitness
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/users">
              Users
            </NavLink>
          </NavItem>
          <NavItem className="ms-sm-auto">
            <NavbarText tag={Button} onClick={onClickLogout}>
              Logout
            </NavbarText>
          </NavItem>
        </Nav>
      </Collapse>
    </NavbarBase>
  );
};

export default AdminNavbar;
