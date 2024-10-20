"use client";

import React, { useState, useEffect } from 'react';
import { EliteClothesLanding } from '@/app/(root)/data'; // Adjust the path according to your structure
import Link from 'next/link';

// Conversion rates (hardcoded for now, but can be dynamic)
const conversionRates = {
  USD: 1,
  NGN: 1630, // Example rate
};

const Shop = () => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency

  // Filter items that are marked as new
  const newItems = EliteClothesLanding.filter(item => item.isNew);

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
    <div className="p-6 mt-36 mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center font-karla">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        {newItems.length > 0 ? (
          newItems.map(item => (
            <div key={item.id} className="h-full justify-center mx-auto text-center p-4 ">
              <img src={item.img} alt={item.name} className="w-full h-54 object-cover rounded" />
              <h3 className="text-[18px] font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-700">
                from: <span className="font-bold text-red-500">{currency === 'USD' ? '$' : '₦'}{convertPrice(item.price)}</span> 
              </p>
              <Link href={`/item/${item.id}`} className=" bg-black text-white py-2 px-4 rounded-md mt-2 inline-block">View Details</Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No new items available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
