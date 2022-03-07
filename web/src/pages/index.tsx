import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useCallback, useEffect } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import AdminNavbar from '../components/admin/navbar';

const Index: FC = () => {
  return (
    <>
      <Container className="mt-5">
        <AdminNavbar />

        <Card className="mt-4">
          <CardBody>
            Redirecting
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    const {data: {user}} = await axios.get('http://localhost:8000/api/auth', {
      withCredentials: true,
      headers: req.headers
    });

    let destination = '';

    if (location.pathname !== `/${user.type}`) {
      if (user.type === 'admin') destination = `/admin/summary`
      else destination = `/${user.type}`;
    }

    return {
      redirect: {
        permanent: false,
        destination
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
}

export default Index;
