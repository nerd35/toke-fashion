"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const router = useRouter()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                address, 
                firstname,
                lastname,
                state, 
                city, 
                phonenumber, 
                country, 
            }),
        });
    
        if (!res.ok) {
            const errorData = await res.text(); // Get the error message as text
            console.error('Error:', errorData);
            return; // Exit the function early
        }
        
        await res.json();
        toast.success('User created successfully:');
        router.push("/account")
        
    };
    
    
    
    

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <div className="w-full max-w-lg p-6 space-y-8">
                    <h1 className="text-2xl font-semibold text-center">Create Account</h1>

                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Username */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block font-karla text-lg font-semibold text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* First Name */}
                        <div className="mb-2">
                            <label htmlFor="firstname" className="block font-karla text-lg font-semibold text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                                className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-2">
                            <label htmlFor="lastname" className="block font-karla text-lg font-semibold text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                value={lastname} onChange={(e) => setLastname(e.target.value)}
                                className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-karla text-lg font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-karla text-lg font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 outline-none bg-transparent  block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block font-karla text-lg font-semibold text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={address} onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 outline-none bg-transparent block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* State */}
                        <div className="mb-4">
                            <label htmlFor="state" className="block font-karla text-lg font-semibold text-gray-700">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                value={state} onChange={(e) => setState(e.target.value)}
                                className="mt-1 outline-none bg-transparent block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* City */}
                        <div className="mb-4">
                            <label htmlFor="city" className="block font-karla text-lg font-semibold text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={city} onChange={(e) => setCity(e.target.value)}
                                className="mt-1 outline-none bg-transparent block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label htmlFor="phonenumber" className="block font-karla text-lg font-semibold text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phonenumber"
                                value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mt-1 outline-none bg-transparent block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div className="mb-4">
                            <label htmlFor="country" className="block font-karla text-lg font-semibold text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={country} onChange={(e) => setCountry(e.target.value)}
                                className="mt-1 outline-none bg-transparent block w-full px-3 py-4 border focus:outline-none focus:ring focus:border-none sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-gray-900 text-white font-karla text-sm font-medium hover:bg-opacity-90"
                    >
                        Create Account
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center">
                        <hr className="w-full border-t border-gray-300" />
                        <span className="px-2 text-gray-500">or</span>
                        <hr className="w-full border-t border-gray-300" />
                    </div>

                    {/* Sign In Button */}
                    <Link href={"/account"}
                        className="block text-center bg-gray-400 py-4 text-white outline-none text-sm font-medium hover:bg-opacity-90"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default CreateAccount;
