import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Card, CardBody, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AddFitness from '../../components/admin/add-fitness';
import FitnessList from '../../components/admin/fitness-list';
import AdminNavbar from '../../components/admin/navbar';
import UserList from '../../components/admin/user-list';

const Admin: FC = () => {
  return (
    <div className="d-flex vh-100">
      <Container className="my-auto">
        <AdminNavbar />

        <Card className="mt-2">
          <CardBody style={{height: '32rem', overflowY: 'scroll'}}>
            <UserList />
            {/* <AddFitness />
            <FitnessList /> */}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    await axios.get('http://localhost:8000/api/auth', {
      withCredentials: true,
      headers: req.headers
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }
  } finally {
    return {
      props: {}
    }
  }
}

export default Admin;
