// pages/api/login.ts
import { createClient } from '@sanity/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse  } from 'next/server';

const client = createClient({
    projectId: '73vn145o',
    dataset: 'production',
  useCdn: true,
});

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    // Fetch user from Sanity by email
    const query = '*[_type == "user" && email == $email][0]';
    const user = await client.fetch(query, { email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the hashed password stored in Sanity with the provided password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    // Return the token as a response
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
