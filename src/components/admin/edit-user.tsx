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
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { ajax } from "~/helpers/ajax";
import { IUser, TFormInput } from "~/types";

type TRegistrationInputForm = Omit<
  TFormInput,
  "type" | "email" | "username"
> & {
  id: string;
  confirmPassword: TFormInput["password"];
};

type TProps = {
  user: IUser;
  active: boolean;
  toggle: () => void;
};

const EditUser: FC<TProps> = ({ user, active, toggle }) => {
  const alert = useAlert();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistrationInputForm>({
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      password: "",
      confirmPassword: "",
      address: user.address,
      contactNumber: user.contactNumber,
    },
  });

  const onSubmitRegister: SubmitHandler<TRegistrationInputForm> = async (
    inputFormData,
    event
  ) => {
    console.log("clicked");
    event?.preventDefault();

    try {
      console.log(inputFormData);
      await ajax.put("/api/auth", inputFormData);
      alert.success("User Updated");
      location.reload();
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
    <Modal isOpen={active} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmitRegister)} autoComplete="off">
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
                placeholder="Confirm Password"
                innerRef={confirmPasswordRef}
                {...confirmPasswordRegister}
                invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
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
            <div className="d-flex justify-content-end">
              <Button color="primary">Save</Button>
            </div>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditUser;
