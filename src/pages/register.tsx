import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { FC } from "react";
import { useAlert } from "react-alert";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
} from "reactstrap";
import { ajax } from "~/helpers/ajax";
import { TFormInput } from "~/types";

type TRegistrationInputForm = Omit<TFormInput, "type"> & {
  confirmPassword: TFormInput["password"];
};

const Index: FC = () => {
  const alert = useAlert();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistrationInputForm>();

  const onSubmitRegister: SubmitHandler<TRegistrationInputForm> = async (
    inputFormData,
    event
  ) => {
    event?.preventDefault();

    try {
      await ajax.post("/api/auth/register", inputFormData);
      alert.success("Registration Complete");
      location.href = "/login";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  };

  const { ref: firstnameRef, ...firstnameRegister } = register("firstname", {
    required: "Firstname is Required",
    minLength: {
      value: 2,
      message: "Username must atleast have 2 characters",
    },
  });

  const { ref: lastnameRef, ...lastnameRegister } = register("lastname", {
    required: "Last Name is Required",
    minLength: {
      value: 2,
      message: "Last Name must atleast have 2 characters",
    },
  });

  const { ref: contactRef, ...contactRegister } = register("contactNumber", {
    required: "Contact Number is Required",
    validate(value) {
      return (
        /((^(\+)(\d){12}$)|(^\d{11}$))/.test(value) || "Incorrect phone number"
      );
    },
  });

  const { ref: addressRef, ...addressRegister } = register("address", {
    required: true,
  });

  const { ref: emailRef, ...emailRegister } = register("email", {
    required: "Field is Required",
    validate(value) {
      return (
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
          value
        ) || "Invalid E-Mail Format"
      );
    },
  });

  const { ref: usernameRef, ...usernameRegister } = register("username", {
    required: "Field is Required",
    minLength: {
      value: 8,
      message: "Username must atleast have 8 characters",
    },
  });

  const { ref: passwordRef, ...passwordRegister } = register("password", {
    required: "Field is Required",
    minLength: {
      value: 8,
      message: "Password must atleast have 8 characters",
    },
  });

  const { ref: confirmPasswordRef, ...confirmPasswordRegister } = register(
    "confirmPassword",
    {
      required: "Field is Required",
      validate(value) {
        return value === watch("password") || "Password doesn't match";
      },
    }
  );

  return (
    <div className="d-flex vh-100">
      <Container className="my-auto">
        <Col className="mx-auto" md={6}>
          <Card>
            <CardHeader>
              <h1>Register</h1>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={handleSubmit(onSubmitRegister)}
                autoComplete="off"
              >
                <FormGroup row>
                  <Col md={6}>
                    <Input
                      placeholder="First Name"
                      innerRef={firstnameRef}
                      invalid={!!errors.firstname}
                      {...firstnameRegister}
                    />
                    {errors.firstname && (
                      <FormFeedback>{errors.firstname.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md={6}>
                    <Input
                      placeholder="Last Name"
                      innerRef={lastnameRef}
                      invalid={!!errors.lastname}
                      {...lastnameRegister}
                    />
                    {errors.lastname && (
                      <FormFeedback>{errors.lastname.message}</FormFeedback>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="E-Mail"
                    innerRef={emailRef}
                    {...emailRegister}
                    invalid={!!errors.email}
                  />
                  {errors.email && (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="Username"
                    innerRef={usernameRef}
                    {...usernameRegister}
                    invalid={!!errors.username}
                  />
                  {errors.username && (
                    <FormFeedback>{errors.username.message}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup row>
                  <Col md={6}>
                    <Input
                      type="password"
                      placeholder="Password"
                      innerRef={passwordRef}
                      {...passwordRegister}
                      invalid={!!errors.password}
                    />
                    {errors.password && (
                      <FormFeedback>{errors.password.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md={6}>
                    <Input
                      type="password"
                      placeholder="Password"
                      innerRef={confirmPasswordRef}
                      {...confirmPasswordRegister}
                      invalid={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <FormFeedback>
                        {errors.confirmPassword.message}
                      </FormFeedback>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="Contact Number"
                    innerRef={contactRef}
                    {...contactRegister}
                    invalid={!!errors.contactNumber}
                  />
                  {errors.contactNumber && (
                    <FormFeedback>{errors.contactNumber.message}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="Address"
                    innerRef={addressRef}
                    {...addressRegister}
                    invalid={!!errors.address}
                  />
                  {errors.address && (
                    <FormFeedback>{errors.address.message}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between">
                    <Link href="/login">Login</Link>
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
    let destination = "";
    const {
      data: { user },
    } = await ajax.get("/api/auth", {
      withCredentials: true,
      headers: req.headers,
    });

    if (req.url !== `/${user.type}`) {
      if (user.type === "admin") destination = `/admin/dashboard`;
      else destination = `/${user.type}`;
    }

    res.writeHead(302, {
      // or 301
      Location: destination,
    });
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Index;
