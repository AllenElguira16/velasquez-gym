import axios from 'axios';
import React, { FC, useCallback, useEffect } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import AdminNavbar from '../components/admin/navbar';

const Index: FC = () => {

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data: {user}} = await axios.get('/api/auth');
  
      if (location.pathname !== `/${user.type}`) {
        if (user.type === 'admin') location.href = `/admin/fitness`
        else location.href = `/${user.type}`;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) location.href = '/login'
    }
  }, []);

  useEffect(() => {
    fetchAuthUser();
  }, [fetchAuthUser]);

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

export default Index;
