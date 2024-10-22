// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { items, totalPrice } = await request.json();

    const paystackUrl = "https://api.paystack.co/transaction/initialize";
    const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY; // Ensure you're using the correct key

    try {
        // Log the values being sent to Paystack
        console.log("Preparing to call Paystack with:", { email: "customer@example.com", amount: totalPrice * 100 });

        const response = await fetch(paystackUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${secretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "customer@example.com", // Replace with a valid email
                amount: totalPrice * 100, // Convert to kobo
                currency: "NGN",
            }),
        });

        const data = await response.json();

        if (response.ok && data.status) {
            return NextResponse.json({ url: data.data.authorization_url });
        } else {
            console.error("Paystack API error:", data);
            return NextResponse.json({ error: data.message || "Unable to create session" }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error in Paystack request:", error);
        return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
}
