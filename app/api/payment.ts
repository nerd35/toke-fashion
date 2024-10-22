// pages/api/payment.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, amount } = req.body;

    // Here you would normally initiate the payment on your server
    // For this example, we'll just return a success response
    res.status(200).json({ status: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
