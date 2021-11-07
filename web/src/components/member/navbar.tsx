import React, { FC } from 'react';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar as NavbarBase, NavbarBrand, NavbarText, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';

const Navbar: FC = () => {
  return (
    <NavbarBase color="light" expand="md" light className="rounded">
      <NavbarBrand>
        Velasquez Gym
      </NavbarBrand>

      <Collapse>
        <Nav
          className="me-auto"
          navbar
        >
          <NavItem>
            <NavLink href="/components/">
              Components
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
          <UncontrolledDropdown
            inNavbar
            nav
          >
            <DropdownToggle
              caret
              nav
            >
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>
          Simple Text
        </NavbarText>
      </Collapse>
    </NavbarBase>  
  );
};

export default Navbar;
