import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';

type TLoginInputForm = {
  username: string;
  password: string;
}

const Login: FC = () => {
  const alert = useAlert();

  const [inputForm, setInputForm] = useState<TLoginInputForm>({
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
      await axios.post('http://localhost:8000/api/auth/login', inputForm);

      alert.success('Login Complete, redirecting...');
      location.href = '/';
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
              <h1>Login</h1>
            </CardHeader>
            <CardBody>
              <Form onSubmit={onSubmitRegister}>
                <FormGroup>
                  <Input
                    autoCapitalize="off"
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
                    <a href="/register">Register</a>
                    <Button color="primary">Login</Button>
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
    const {data: {user}} = await axios.get('http://localhost:8000/api/auth', {
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

export default Login;
