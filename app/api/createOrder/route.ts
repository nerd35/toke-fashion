
import { createClient } from '@sanity/client';
import nodemailer from 'nodemailer';

// Initialize the Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_KEY,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    useCdn: true,
    token: process.env.NEXT_PUBLIC_TOKEN,
    apiVersion: '2022-03-07'
});

// Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER, // Your Gmail address
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS,  // Your Gmail App Password or Gmail password
    },
});

export default async function createOrder(req, res) {
    if (req.method === 'POST') {
        try {
            const orderData = JSON.parse(req.body);

            // Create a new order in Sanity
            const order = await client.create({
                _type: 'order',
                userId: orderData.userId,
                firstname: orderData.firstname,
                lastname: orderData.lastname,
                email: orderData.email,
                phone: orderData.phone,
                address: orderData.address,
                city: orderData.city,
                state: orderData.state,
                country: orderData.country,
                paymentMethod: orderData.paymentMethod,
                totalAmount: orderData.totalAmount,
                status: orderData.status,
                orderDetails: orderData.orderDetails,
            });

            // Send email to the client
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: orderData.email,
                subject: 'Order Confirmation - Thank You for Your Order!',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                        <h2 style="color: #333;">Thank You for Your Order, ${orderData.firstname}!</h2>
                        <p>Your payment of <strong>$${orderData.totalAmount}</strong> has been successfully processed.</p>
                        <h3 style="color: #555;">Order Details:</h3>
                        <ul>
                            ${orderData.orderDetails.map(item => `
                                <li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}</li>
                            `).join('')}
                        </ul>
                        <p>We will notify you when your order is shipped.</p>
                        <p style="color: #777;">This email was sent from our order notification system.</p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);

            // Return the created order
            res.status(201).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Failed to create order.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}