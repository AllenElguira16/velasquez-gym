import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Container } from 'reactstrap';
import paymaya from 'paymaya-js-sdk';

import HomeNavbar from '../../../components/member/navbar';

const Payment = () => {
  const referenceId = Math.floor(100000000 + Math.random() * 900000000);
  const submitPayment = async () => {
    paymaya.init('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah', true);
    paymaya.createCheckout({
      "totalAmount": {
        "value": 100,
        "currency": "PHP",
        "details": {
          "discount": 0,
          "serviceCharge": 0,
          "shippingFee": 0,
          "tax": 0,
          "subtotal": 100
        }
      },
      "items": [
        {
          "name": "Velasquez Gym - Membership Payment",
          "quantity": 1,
          "code": "CVG-096732",
          "description": "Shoes",
          "amount": {
            "value": 100,
            "details": {
              "discount": 0,
              "serviceCharge": 0,
              "shippingFee": 0,
              "tax": 0,
              "subtotal": 100
            }
          },
          "totalAmount": {
            "value": 100,
            "details": {
              "discount": 0,
              "serviceCharge": 0,
              "shippingFee": 0,
              "tax": 0,
              "subtotal": 100
            }
          }
        }
      ],
      "redirectUrl": {
        "success": "http://localhost:3000/member/payment/success?ref_id=" + referenceId,
        "failure": "http://localhost:3000/member/payment/error",
        "cancel": "http://localhost:3000/member/payment/error"
      },
      "requestReferenceNumber": referenceId.toString(),
      "metadata": {}
    });
  }

  return (
    <div className="d-flex vh-100">
      <Container className="my-auto">
        <HomeNavbar />

        <Card className="mt-4 p-2">
          <h2>Membership Payment</h2>

          <p>To access any service, kindly proceed to payment through the PayMaya</p>
          <Button className="mt-5" color="primary" onClick={submitPayment}>Proceed to payment</Button>
        </Card>
      </Container>
    </div>
  );
};

export default Payment;
