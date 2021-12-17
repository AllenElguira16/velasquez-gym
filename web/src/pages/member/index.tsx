import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardTitle, Col, Container } from 'reactstrap';
import Calendar from '../../components/member/calendar';
import ChooseFitness from '../../components/member/choose-fitness';

import HomeNavbar from '../../components/member/navbar';

const Index: FC = () => {
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
    <div className="d-flex mt-1">
      <Container className="my-auto">
        {authUser && (<HomeNavbar user={authUser} />)}

        <Card className="mt-2">
          <CardBody>
            {/* if on first login */}
            {(authUser && authUser.fitness === null) ? (
              <ChooseFitness />
            ) : (
              <Calendar />
            )}
          </CardBody>
        </Card>

      </Container>
    </div>
  );
};

export default Index;
