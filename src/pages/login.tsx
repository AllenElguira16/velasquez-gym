import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAlert } from "react-alert";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { ajax } from "~/helpers/ajax";
import { IUser } from "~/types";

type TLoginInputForm = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const alert = useAlert();

  const [inputForm, setInputForm] = useState<TLoginInputForm>({
    username: "",
    password: "",
  });

  const onInputChange =
    (key: keyof IUser) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInputForm({
        ...inputForm,
        [key]: event.currentTarget.value,
      });
    };

  const onSubmitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await ajax.post("/api/auth/login", inputForm);

      alert.success("Login Complete, redirecting...");
      location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  };

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
                    onChange={onInputChange("username")}
                    value={inputForm.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={onInputChange("password")}
                    value={inputForm.password}
                  />
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between">
                    <Link href="/register">Register</Link>
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
    let destination = "";
    const {
      data: { user },
    } = await ajax.get("/api/auth", {
      withCredentials: true,
      headers: req.headers,
    });

    if (req.url !== `/${user.type}`) {
      if (user.type === "admin") destination = `/admin/summary`;
      else destination = `/${user.type}`;
    }

    res.writeHead(302, {
      // or 301
      Location: destination,
    });
    res.end();
  } catch (error) {
    if (axios.isAxiosError(error)) {
    } // NOSONAR
  }

  return {
    props: {},
  };
};

export default Login;
