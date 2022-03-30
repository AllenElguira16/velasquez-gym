import React, { useEffect, useRef } from 'react';
import { Button, Card, Container } from 'reactstrap';
import paymaya from 'paymaya-js-sdk';

import HomeNavbar from '../../../components/member/navbar';

const Payment = () => {
  const paymayaForm = useRef<HTMLDivElement>(null);
  const referenceId = Math.floor(100000000 + Math.random() * 900000000);

  const submitPayment = async () => {
    paymaya.createCheckout({
      "totalAmount": {
        "value": 1000,
        "currency": "PHP",
        "details": {
          "discount": 0,
          "serviceCharge": 0,
          "shippingFee": 0,
          "tax": 0,
          "subtotal": 500
        }
      },
      "items": [
        {
          "name": "Velasquez Gym - Membership Payment",
          "quantity": 1,
          "code": "CVG-096732",
          "description": "Gym",
          "amount": {
            "value": 500,
            "details": {
              "discount": 0,
              "serviceCharge": 0,
              "shippingFee": 0,
              "tax": 0,
              "subtotal": 500
            }
          },
          "totalAmount": {
            "value": 500,
            "details": {
              "discount": 0,
              "serviceCharge": 0,
              "shippingFee": 0,
              "tax": 0,
              "subtotal": 500
            }
          }
        }
      ],
      "redirectUrl": {
        "success": `${location.origin}/member/payment/success?ref_id=${referenceId}`,
        "failure": `${location.origin}/member/payment/error`,
        "cancel": `${location.origin}/member/payment/error`
      },
      "requestReferenceNumber": referenceId.toString(),
      "metadata": {}
    });  
  }

  useEffect(() => {
    paymaya.init('pk-eo4sL393CWU5KmveJUaW8V730TTei2zY8zE4dHJDxkF', true);
  }, []);

  return (
    <div className="d-flex vh-100">
      <Container className="my-auto">
        <HomeNavbar />

        <Card className="mt-4 p-2">
          <h2>Membership Payment</h2>

          <p>To access any service, kindly proceed to payment through the PayMaya</p>

          {/* <div ref={paymayaForm}></div> */}

          <Button className="mt-5" color="primary" onClick={submitPayment}>Proceed to payment</Button>
        </Card>
      </Container>
    </div>
  );
};

export default Payment;
