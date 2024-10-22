"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductData } from '@/app/api/interface';
import { getData } from '@/app/api/sanity';
import { urlFor } from '@/lib/sanity';

// Conversion rates (hardcoded for now, but can be dynamic)
const conversionRates = {
  USD: 1,
  NGN: 1830, // Example rate
};

const Pants = () => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency
  const [products, setProducts] = useState<ProductData[]>([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductData = await getData();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setProducts(data);
          console.log('Products after fetching:', data);
        } else {
          console.warn('Expected an array for the products, received:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  // if(loading) return <div className='justify-center text-center mx-auto'><Loader2/></div>
 

    // Filter items that are in the "t-shirt" category
    
    const tShirtItems = products?.filter((item) => item.gender === 'men')

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
  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="p-6 mt-24 mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center font-karla">Men</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
        {tShirtItems.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tShirtItems.map((item: ProductData) => (
            <div key={item._id} className="h-full justify-center mx-auto text-center p-4 ">
              <div className="relative bg-gray-100 w-full h-72">
                                <img
                                    src={urlFor(item?.img[0]?.asset).url()}
                                    alt={item.name}
                                    className="w-[330px]  h-[275px] object-cover rounded"
                                />
                                {item.hot === "Yes" && (

                                <span className="absolute top-4 left-4 bg-red-700 text-white text-sm font-karla py-1 px-3 rounded">
                                    {item.hot === "Yes" && <p>HOT</p>}
                                </span>
                                )}
                            </div>
              <Link href={`/product/${item.slug.current}`}className="text-[18px] font-semibold mt-2">{item.name}</Link>
              <p className="text-gray-700">
                from: <span className="font-bold text-red-500">{currency === 'USD' ? '$' : '₦'}{convertPrice(item.price)}</span> 
              </p>
              <Link href={`/product/${item.slug.current}`}  className="bg-black text-white py-2 px-4 rounded-md mt-2 inline-block">View Details</Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No t-shirts available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Pants;
