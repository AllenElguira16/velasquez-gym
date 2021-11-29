import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Container } from 'reactstrap';
import paymaya from 'paymaya-js-sdk';

import HomeNavbar from '../../../components/member/navbar';

const Payment = () => {
  // const [authUser, setAuthUser] = useState<IUser>();

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data: {user}} = await axios.get('/api/auth');
  
      if (location.pathname !== `/${user.type}`) location.href = `/${user.type}`;
      else if (user.membership === null) location.href = '/member/payment';
      // else setAuthUser(user);
      
    } catch (error) {
      if (axios.isAxiosError(error))
        location.href = '/login';
    }
  }, []);

  // useEffect(() => {
  //   fetchAuthUser();
  // }, [fetchAuthUser]);

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
    <Container className="mt-5">
      <HomeNavbar />

      <Card className="mt-4 p-2">
        <h2>Membership Payment</h2>

        <p>To access any service, kindly proceed to payment through the PayMaya</p>
        <Button color="primary" onClick={submitPayment}>Proceed to payment</Button>
      </Card>

    </Container>
  );
};

export default Payment;
