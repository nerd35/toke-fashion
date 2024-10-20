"use client";

import { useState, useEffect } from 'react';
import { EliteClothesLanding } from '@/app/(root)/data';
import Image from 'next/image';
import React from 'react';

// Conversion rates (hardcoded for now, but can be dynamic)
const conversionRates = {
  USD: 1,
  NGN: 1630, // Example rate
};

const NewArrival = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency
  const itemsToShow = 4;

  // Handle scrolling for the carousel
  const handleScroll = (direction: string) => {
    const maxScrollIndex = Math.ceil(EliteClothesLanding.length / itemsToShow) - 1;
    setScrollIndex((prevIndex) => {
      if (direction === 'right') {
        return Math.min(prevIndex + 1, maxScrollIndex);
      } else {
        return Math.max(prevIndex - 1, 0);
      }
    });
  };

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
    <div className="relative">
      <div className="overflow-x-hidden flex">
        <div
          className="flex transition-transform gap-4 py-6"
          style={{ transform: `translateX(-${scrollIndex * (100 / itemsToShow)}%)` }}
        >
          {EliteClothesLanding?.map((item) => (
            item.isNew === true && (
              <div key={item.id} className="flex-shrink-0 px-6 border-gray-50 rounded-md w-64 h-auto relative">
                <div className="relative w-full h-72">
                  <Image
                    src={item.img}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <p className="text-center text-[15px] font-karla text-[#2b2b2b]">{item.name}</p>
                <p className="text-red-500 font-bold font-karla text-center">
                  from {currency === 'USD' ? '$' : '₦'}{convertPrice(item.price)}
                </p>
              </div>
            )
          ))}
        </div>
      </div>

      <button
        onClick={() => handleScroll('left')}
        disabled={scrollIndex === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black py-2 px-4 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={() => handleScroll('right')}
        disabled={scrollIndex === Math.ceil(EliteClothesLanding.length / itemsToShow) - 1}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black py-2 px-4 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default NewArrival;
