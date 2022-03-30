import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { ajax } from '~/helpers/ajax';
import { IUser } from '~/types';

type TRegistrationInputForm = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  firstLogin?: boolean;
}

const Index: FC = () => {
  const alert = useAlert();
  const [inputForm, setInputForm] = useState<TRegistrationInputForm>({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });

  const onInputChange = (key: keyof IUser) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputForm({
      ...inputForm,
      [key]: event.currentTarget.value
    });
  };

  const onSubmitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await ajax.post('/api/auth/register', inputForm);

      alert.success('Registration Complete');
      location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  }
  
  return (
    <div className="d-flex vh-100">
      <Container className="my-auto">
        <Col className="mx-auto" md={6}>
          <Card>
            <CardHeader>
              <h1>Register</h1>
            </CardHeader>
            <CardBody>
              <Form onSubmit={onSubmitRegister}>
                <FormGroup row>
                  <Col md={6}>

                    <Input
                      placeholder="First Name"
                      onChange={onInputChange('firstname')}
                      value={inputForm.firstname}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      placeholder="Last Name"
                      onChange={onInputChange('lastname')}
                      value={inputForm.lastname}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="E-mail"
                    onChange={onInputChange('email')}
                    value={inputForm.email}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="Username"
                    onChange={onInputChange('username')}
                    value={inputForm.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={onInputChange('password')}
                    value={inputForm.password}
                  />
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/login">Login</a>
                    <Button color="primary">Register</Button>
                  </div>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    let destination = '';
    const {data: {user}} = await ajax.get('/api/auth', {
      withCredentials: true,
      headers: req.headers
    });

    if (req.url !== `/${user.type}`) {
      if (user.type === 'admin') destination = `/admin/summary`
      else destination = `/${user.type}`;
    }

    res.writeHead(302, { // or 301
      Location: destination,
    });
    res.end();
  } catch (error) {
    if (axios.isAxiosError(error)) {}
  }

  return {
    props: {}
  }
}

export default Index;
