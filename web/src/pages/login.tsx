import axios from 'axios';
import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';

type TLoginInputForm = {
  username: string;
  password: string;
}

const Login: FC = () => {

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
      await axios.post('/api/auth/login', inputForm);

      alert('Login Complete, redirecting...');
      location.href = '/';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }

  const fetchAuthUser = useCallback(async () => {
    try {
      await axios.get('/api/auth');
  
      location.href = '/';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchAuthUser();
  }, [fetchAuthUser]);

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

export default Login;
