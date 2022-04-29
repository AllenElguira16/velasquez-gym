import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { Card, Container } from "reactstrap";
import HomeNavbar from "../../../components/member/navbar";
import { ajax } from "~/helpers/ajax";

const Payment = () => {
  const setPayment = useCallback(async () => {
    try {
      await ajax.post("/api/user/membership");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, []);

  useEffect(() => {
    setPayment();
  }, [setPayment]);

  return (
    <Container className="mt-5">
      <HomeNavbar />

      <Card className="mt-4 p-2">
        <h1>Payment Success!</h1>

        <p>You have successfully paid for membership</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/member">Payment Success go to homepage</a>
      </Card>
    </Container>
  );
};

export default Payment;
