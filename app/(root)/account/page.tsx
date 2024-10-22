"use client"

import { Loader2 } from 'lucide-react';
// pages/login.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const resError = await response.json();
        throw new Error(resError.error || 'Login failed');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token); // Store token in local storage

      // Optionally, redirect user after login or show success message
      toast.success('Login successful!');
      router.push('/')
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true)
    // Check for the token on component mount
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, redirect to the landing page
      router.push('/'); // Change this to your landing page route
    } else {
      setLoading(false); // If no token, set loading to false
    }
  }, [router]);
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p><Loader2 size={"30px"}/></p></div>; // Loading state
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-lg p-6 space-y-8 ">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        
        
          <div className="mb-4">
            <label htmlFor="email" className="block font-karla text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border    focus:outline-none focus:ring focus:border-none sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
          <label htmlFor="email" className="block font-karla text-lg font-semibold text-gray-700">
          Password
            </label>
            <input
              type="password"
              id="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
             className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border    focus:outline-none focus:ring focus:border-none sm:text-sm"
              required
            />
            <div className="flex justify-end mt-2">
              <Link href="#" className="text-sm text-gray-500 hover:text-black">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white font-karla text-sm font-medium hover:bg-opacity-90"
          >
           {loading ? "Processing": "Sign In"}
          </button>
        

        {/* Divider */}
        <div className="flex items-center justify-center">
          <hr className="w-full border-t border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-t border-gray-300" />
        </div>

        {/* Create Account Button */}
        <Link href={"/create-account"}
          className="block text-center  bg-gray-400  py-4 text-white outline-none text-sm font-medium hover:bg-opacity-90"
        >
          Create Account
        </Link>
      </div>
    </div>
    </form>
  );
};

export default Login;
