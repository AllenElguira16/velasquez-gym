import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardTitle, Col, Container } from 'reactstrap';
import Calendar from '../../components/member/calendar';
import ChooseFitness from '../../components/member/choose-fitness';

import HomeNavbar from '../../components/member/navbar';

type Props = { user: IUser };

const Index: NextPage<Props> = ({ user: authUser }) => {
  console.log(authUser);
  // const [authUser, setAuthUser] = useState<IUser>();

  // const fetchAuthUser = useCallback(async () => {
  //   try {
  //     const {data: {user}} = await axios.get('/api/auth');
  
      // if (location.pathname !== `/${user.type}`) location.href = `/${user.type}`;
      // else if (user.membership === null) location.href = '/member/payment' 
      // else setAuthUser(user);
      
  //   } catch (error) {
  //     if (axios.isAxiosError(error))
  //       location.href = '/login';
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchAuthUser();
  // }, [fetchAuthUser]);

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const {data: {user}} = await axios.get('http://localhost:8000/api/auth', {
      withCredentials: true,
      headers: req.headers
    });

    if (req.url !== `/${user.type}`) {
      res.writeHead(302, { // or 301
        Location: `/${user.type}`,
      });
      res.end();
    }
    else if (user.membership === null) {
      res.writeHead(302, { // or 301
        Location: '/member/payment',
      });
      res.end();
    } 

    return {
      props: {
        user
      }
    }
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    // }
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
}

export default Index;
