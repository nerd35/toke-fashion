// app/api/register/route.ts
import { createClient } from '@sanity/client';
import bcrypt from 'bcrypt';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_KEY,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    useCdn: true,
    token: process.env.NEXT_PUBLIC_TOKEN,
    apiVersion: '2022-03-07'
});

export async function POST(req: Request) {
    const { username, email, password, address, firstname, lastname, state, city, phonenumber, country } = await req.json();

    if (!username || !email || !password || !firstname || !lastname) {
        return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
    }

    try {
        // Check if the user already exists
        const existingUser = await client.fetch(`*[_type == "user" && (email == $email || username == $username)][0]`, {
            email,
            username
        });

        if (existingUser) {
            return new Response(JSON.stringify( 'User already registered.' ), { status: 400 });
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

        const response = await client.create(newUser);
        return new Response(JSON.stringify({ message: 'User created', userId: response._id }), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
    }
}
