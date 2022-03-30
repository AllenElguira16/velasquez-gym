import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardTitle, Col, Container } from 'reactstrap';
import VirtualAssistanceModal from '../../components/member/virtual-assistant';

import HomeNavbar from '../../components/member/navbar';

const Index: FC = () => {
  const [modal, setModal] = useState(false);
  const [authUser, setAuthUser] = useState<IUser>();

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data: {user}} = await axios.get('/api/auth');
  
      if (location.pathname !== `/${user.type}`) location.href = `/${user.type}`;
      else if (user.membership === null) location.href = '/member/payment' 
      else setAuthUser(user);
      
    } catch (error) {
      if (axios.isAxiosError(error))
        location.href = '/login';
    }
  }, []);

  useEffect(() => {
    fetchAuthUser();
  }, [fetchAuthUser]);

  return (
    <>
      <Container className="mt-5">
        {authUser && (<HomeNavbar user={authUser} />)}

        <Card className="mt-4">
          <CardBody>
            {/* if on first login */}
            {(authUser && authUser.fitness.virtualAssistance) && (
              <VirtualAssistanceModal fitness={authUser.fitness} isModalOpen={modal} toggleModal={() => setModal(!modal)} />
            )}
          </CardBody>
        </Card>

      </Container>
    </>
  );
};

export default Index;
