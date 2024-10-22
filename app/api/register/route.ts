// app/api/register/route.ts
import { createClient } from '@sanity/client';
import bcrypt from 'bcrypt';

const client = createClient({
    projectId: '73vn145o',
    dataset: 'production',
    useCdn: true,
    token: 'sk4AYjHfuBhpmNMDMRDHNFkU0Jqi3KB3iNBuvKtK6WmnpO8u65uByHXy23sEbRumTFSyptCrsubzDmVxCzEbKrK2PCsEwlHSz1n8vkUjljBN2Rx94fCGNRDULIfk2lg1VYXVMI1dhUXYUi1QDYHBdPl8LcmtNvYqu1s11KjzrizxWb5Hz67T',
  apiVersion: '2022-03-07' 
});

export async function POST(req: Request) {
    const { username, email, password, address, firstname, lastname, state, city, phonenumber, country } = await req.json();

    if (!username || !email || !password || !firstname || !lastname) {
        return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        _type: 'user',
        username,
        email,
        password: hashedPassword,
        address,
        firstname,
        lastname,
        state,
        city,
        phonenumber,
        country
    };

    try {
        const response = await client.create(newUser);
        return new Response(JSON.stringify({ message: 'User created', userId: response._id }), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
    }
}
