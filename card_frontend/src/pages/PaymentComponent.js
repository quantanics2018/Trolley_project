import React, { useState } from 'react';

function Payment() {
  const [totalAmount, setTotalAmount] = useState(2);

  const handlePayment = async () => {
    try {

      const response = await fetch('http://localhost:4000/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount * 100, 
          currency: 'INR', 
        }),
      });

      const orderData = await response.json();
      console.log('ordedata',orderData)

      const options = {
        key: 'rzp_test_0MsloSAqW3knPj',
        key_secret:'ePKlU8Hq8PUqSGHAvHNO0iir',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Your Product Name',
        description: 'Payment for your product',
        image: 'https://example.com/logo.png',
        handler: (response) => {
          console.log('Payment ID:', response.razorpay_payment_id);
        },
        prefill: {
          name: 'Customer Name', 
          email: 'customer@example.com', 
          contact: '9876543210', 
        },
        notes: {
          'order_id': orderData.id
        },
        theme: {
          color: '#3399cc'
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.open();

    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  return (
    <div>
      <h2>Total Amount: ₹{totalAmount}</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;