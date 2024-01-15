import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default function Payment() {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
            'http://localhost:5000/api/orders/payment', {
          tokenId: stripeToken.id,
          amount: 1000,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  return (
    <div>
      <StripeCheckout
        name="Glacial Glam"
        description="Payment"
        amount={1000}
        token={onToken}
        billingAddress
        shippingAddress
        stripeKey="pk_test_51OYVnlBwNKl8486SjlHjmZptbHtCDjWMVVjXl1z6HYuVlZhBlU2oHHuHMi6nf8lqSNCulNJ3WyUwqJltkenzeOvO00heNpyi44"
      >
        <button className="bg-black py-2 px-2 text-white">Payment</button>
      </StripeCheckout>
    </div>
  );
}
