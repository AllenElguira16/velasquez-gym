import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { ajax } from '~/helpers/ajax';
import { IUser } from '~/types';
import Calendar from '../../components/member/calendar';
import ChooseFitness from '../../components/member/choose-fitness';

import HomeNavbar from '../../components/member/navbar';

type Props = { user: IUser };

const Index: NextPage<Props> = ({ user: authUser }) => {

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
    const {data: {user}} = await ajax.get('/api/auth', {
      withCredentials: true,
      headers: req.headers
    });

    if (req.url !== `/${user.type}`) {
      res.writeHead(302, { // or 301
        Location: `/${user.type}`,
      });
      res.end();
    } else if (user.memberships.length === 0) {
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
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
}

export default Index;
