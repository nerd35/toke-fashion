"use client"; // This marks the component as a Client Component

import { ProductData } from '@/app/api/interface';
import { getDataBySlug } from '@/app/api/sanity';
import AddToCart from '@/components/AddToCart';
// import Checkout from '@/components/Checkout'; 
import ImageGallery from '@/components/ImageGallery';
import { urlFor } from '@/lib/sanity';
import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';


const conversionRates = {
    USD: 1,
    NGN: 1830, // Example rate
};


export default function ProductPage({ params }: { params: { slug: string } }) {
    const [data, setData] = useState<ProductData | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency
    const [loading, setLoading] = useState(true); // Loading state
    
  

    // Fetch product data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData: ProductData = await getDataBySlug(params.slug);
                setData(productData);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false); // Ensure loading is false even if there's an error
            }
        };

        fetchData();
    }, [params.slug]);


    // Function to increase the quantity
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to decrease the quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

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
        return <p>Loading products...</p>; // Ensure a loading state is shown
    }

    if (!data) {
        return <div>No product data available</div>; // Handle cases where data might not be available
    }
   

    return (
        <div className="mt-32 mb-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Image gallery */}
                    <ImageGallery img={urlFor(data?.img).url()} item={data?.hot} />

                    {/* Product details section */}
                    <div className="mt-20">
                        <h1 className="font-karla font-bold text-3xl">{data?.name}</h1>
                        <p className="text-gray-700">
                            <span className="font-bold mt-3 text-lg text-gray-500">{currency === 'USD' ? '$' : '₦'}{convertPrice(data?.price)}</span>
                        </p>

                        {/* Quantity Selector */}
                        <div className="mt-4 flex items-center gap-3">
                        <label htmlFor="size" className="block font-normal text-gray-400 text-sm mb-2">
                        Quantity
                            </label>
                            <div className="flex border rounded-md items-center  space-x-4">
                                <button
                                    onClick={decreaseQuantity}
                                    className=" px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="text-lg px-3 font-karla">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className=" px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>



                        {/* Size, Color, and Season Dropdowns (Optional) */}
                        <div className="mt-6">
                        <div className="mb-4 flex items-center gap-3">
                                <label htmlFor="size" className="block font-normal text-gray-400 text-sm mb-2">
                                    Color
                                </label>
                                <select id="color" className="w-full outline-none border px-3 py-4 rounded-md">
                                    <option>{data?.color}</option>
                                    {/* Add other colors */}
                                </select>
                            </div>
                            <div className="mb-4 flex items-center gap-3">
                                <label htmlFor="size" className="block font-normal text-gray-400 text-sm mb-2">
                                    Size
                                </label>
                                <select id="size" className="w-full outline-none border px-3 py-4 rounded-md">
                                    {data?.size && data.size.length > 0 ? (
                                        data.size.map((s: string, i: number) => (
                                            <option key={i} value={s}>
                                                {s}
                                            </option>
                                        ))
                                    ) : (
                                        <option>No sizes available</option> // Fallback if no sizes exist
                                    )}
                                </select>
                               
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 space-y-4">
                                <AddToCart color={data?.color} name={data?.name} price={data?.price} img={data?.img[0]} description={data?.description} quantity={quantity} _id={data?._id} size={''} />
                                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-700">
                                    Buy it now
                                </button>
                            </div>
                            <div className="mt-5">

                            <span className='mt-8 w-fit flex items-center gap-4 bg-black rounded-full py-4 ps-2 pe-5'>
                                <FaWhatsapp color='#fff' className='ms-4' size={40}/>
                                <div className='me-14'>
                                    <p className='text-green-100 text-[13px] font-karla'>Toke  <span className='bg-green-500 px-1 text-[12px] rounded-full'>online</span></p>
                                    <p className='text-white font-bold text-[14px]'>Need help? Chat with Us</p>
                                </div>
                            </span>
                            </div>
                            <div className="mt-8">
                                <h1 className='text-[15px] font-semibold font-karla text-[#2b2b2b] underline'>Details</h1>
                                <p className='text-gray-400 font-karla  text-[14px]'>{data?.description}</p>
                                <h1 className='text-[15px] mt-6 font-semibold font-karla text-[#2b2b2b]'>Features</h1>
                                <ul>
                                    {data?.features?.map((f: string, index: number) => (
                                        <li key={index}>{f}</li> // Ensure each list item has a key
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} products={cartProduct} />  */}
                
                </div>
        </div>
    );
}
