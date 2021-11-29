import axios from 'axios';
import React, { FC, useState } from 'react';
import { Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar as NavbarBase, NavbarBrand, NavbarText, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import VirtualAssistanceModal from '../../components/member/virtual-assistant';

type TProps = {
  user?: IUser;
}

const HomeNavbar: FC<TProps> = ({ user }) => {
  const [modal, setModal] = useState(false);

  const onClickLogout = async () => {
    await axios.delete('/api/auth');
    location.reload();
  }


  return (
    <>
      <NavbarBase color="primary" expand="md" className="rounded">
        <NavbarBrand>
          Velasquez Gym
        </NavbarBrand>

        <Collapse navbar>
          <Nav
            className="me-auto"
            navbar
          />
            
          <div className="d-flex gap-4">
            {user?.fitness?.virtualAssistance && (<Button onClick={() => setModal(!modal)}>Virtual Assistance</Button>)}
            <Button onClick={onClickLogout}>Logout</Button>
          </div>
        </Collapse>
      </NavbarBase>
      {(user && user.fitness) &&(<VirtualAssistanceModal fitness={user.fitness} isModalOpen={modal} toggleModal={() => setModal(!modal)} />)}
    </>
  );
};

export default HomeNavbar;
