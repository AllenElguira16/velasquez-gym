import React from "react";
import { Card, Container } from "reactstrap";

import HomeNavbar from "../../../components/member/navbar";

const Payment = () => {
  return (
    <Container className="mt-5">
      <HomeNavbar />

      <Card className="mt-4 p-2">
        <h1>Payment Failed</h1>

        <p>There is an error occured while doing the payment</p>
      </Card>
    </Container>
  );
};

export default Payment;
