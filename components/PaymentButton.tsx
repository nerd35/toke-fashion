// components/PaymentButton.tsx

import React from 'react';

const PaymentButton: React.FC = () => {
  const handlePayment = async () => {
    const email = 'customer@example.com'; // Replace with user's email
    const amount = 10000; // Replace with the amount to be charged

    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

    if (!paystackKey) {
      alert('Paystack public key is not defined');
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount }),
      });

      const data = await response.json();

      if (data.status) {
        const handler = window.PaystackPop.setup({
          key: paystackKey,
          email: email,
          amount: amount * 100, // Amount is in kobo
          currency: 'NGN',
          callback: async (response) => {
            const verificationResponse = await fetch(`/api/payment?reference=${response.reference}`);
            const verificationData = await verificationResponse.json();

            // Handle verification response here
            console.log(verificationData);
          },
          onClose: () => {
            alert('Transaction was not completed, window closed.');
          },
        });

        handler.openIframe();
      } else {
        alert('Payment initialization failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handlePayment} className="bg-blue-500 text-white py-2 px-4 rounded">
      Pay with Paystack
    </button>
  );
};

export default PaymentButton;
