import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Card, CardBody, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AddFitness from '../../components/admin/add-fitness';
import FitnessList from '../../components/admin/fitness-list';
import AdminNavbar from '../../components/admin/navbar';

const Admin: FC = () => {
  const [authUser, setAuthUser] = useState<IUser>();

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data: {user}} = await axios.get('/api/auth');
  
      setAuthUser(user);
      
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
        <AdminNavbar />

        <Card className="mt-2">
          <CardBody style={{height: '32rem', overflowY: 'scroll'}}>
            <AddFitness />
            <FitnessList />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default Admin;
