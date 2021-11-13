import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardTitle, Col, Container } from 'reactstrap';
import Calendar from '../components/member/calendar';
import ChooseFitness from '../components/member/choose-fitness';

import HomeNavbar from '../components/member/navbar';

const Index: FC = () => {
  const [authUser, setAuthUser] = useState<IUser>();

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data: {user}} = await axios.get('/api/auth');
  
      if (location.pathname !== `/${user.type}`) location.href = `/${user.type}`;
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
        <HomeNavbar />

        <Card className="mt-4">
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
    </>
  );
};

export default Index;
