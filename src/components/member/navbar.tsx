import React, { FC, useState } from 'react';
import { Button, Collapse, Nav, Navbar as NavbarBase, NavbarBrand, NavbarToggler } from 'reactstrap';
import { ajax } from '~/helpers/ajax';
import { IUser } from '~/types';
import VirtualAssistanceModal from '../../components/member/virtual-assistant';

type TProps = {
  user?: IUser;
}

const HomeNavbar: FC<TProps> = ({ user }) => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const onClickLogout = async () => {
    await ajax.delete('/api/auth');
    location.reload();
  }


  return (
    <>
      <NavbarBase dark color="primary" expand="sm" className="rounded">
        <NavbarBrand>
          Velasquez Gym
        </NavbarBrand>
        <NavbarToggler onClick={() => setNavbarOpen(!isNavbarOpen)}/>
        <Collapse isOpen={isNavbarOpen} navbar>
          <Nav
            className="me-auto"
            navbar
          />
            
          <div className="d-flex flex-sm-row flex-column gap-sm-4 gap-2">
            {user?.fitness?.virtualAssistance && (<Button className="flex-1" onClick={() => setModal(!modal)}>Virtual Assistance</Button>)}
            <Button onClick={onClickLogout}>Logout</Button>
          </div>
        </Collapse>
      </NavbarBase>
      {(user && user.fitness) &&(<VirtualAssistanceModal fitness={user.fitness} isModalOpen={modal} toggleModal={() => setModal(!modal)} />)}
    </>
  );
};

export default HomeNavbar;
