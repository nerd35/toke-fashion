"use client"

import { EliteClothesLanding } from '@/app/(root)/data';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Conversion rates (hardcoded for now, but can be dynamic)
const conversionRates = {
    USD: 1,
    NGN: 1630, // Example rate
};

const Pants = () => {
    const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency

    // Filter items that are in the "t-shirt" category
    const tShirtItems = EliteClothesLanding.filter(item => item.category === 'pant').slice(0, 4);

    // Convert price based on the selected currency
    const convertPrice = (priceInUSD: number) => {
        return (priceInUSD * conversionRates[currency]).toFixed(2); // Convert and round to 2 decimals
    };

    // Fetch preferred currency from localStorage on component mount
    useEffect(() => {
        const savedCurrency = localStorage.getItem('preferredCurrency') as 'USD' | 'NGN';
        if (savedCurrency) {
            setCurrency(savedCurrency);
        }

        // Add an event listener to detect changes to localStorage
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'preferredCurrency' && event.newValue) {
                setCurrency(event.newValue as 'USD' | 'NGN');
            }
        };

        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center font-karla">Pants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto gap-6">
                {tShirtItems.length > 0 ? (
                    tShirtItems.map(item => (
                        <div key={item.id} className="h-full justify-center mx-auto text-center p-4">
                            <img src={item.img} alt={item.name} className="w-[300px] h-[375px] object-cover rounded" />
                            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                            <p className="text-gray-700">from: <span className="font-bold text-red-500">{currency === 'USD' ? '$' : '₦'}{convertPrice(item.price)}</span></p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No t-shirts available at the moment.</p>
                )}
            </div>
            <div className="text-center">
                <Link href={`/pants`}>
                    <span className="mt-4 inline-block bg-black text-white py-2 px-4 rounded hover:bg-blue-600">
                        View Details
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Pants;
