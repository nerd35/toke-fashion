"use client";

import { CartItem, useCart } from "@/app/context/CartContext";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckoutNow from "./Checkout";
import Link from "next/link";

const conversionRates = {
    USD: 1,
    NGN: 1830, // Example rate
};

function ShoppingCartModal() {
    const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency
    const { getCartDetails, isCartOpen, toggleCart, addItem, removeItem } = useCart();
    const { items, totalItems, totalPrice } = getCartDetails(); // Destructure items and totalItems from getCartDetails

    // Function to handle quantity increment
    const handleIncrement = (item: CartItem) => {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        addItem(updatedItem); // This should add one to the existing quantity
    };

    // Function to handle quantity decrement
    const handleDecrement = (item: CartItem) => {
        if (item.quantity > 1) {
            const updatedItem = { ...item, quantity: item.quantity - 1 };
            addItem(updatedItem); // This should update the quantity down by one
        } else {
            removeItem(item._id); // Remove the item if quantity is 1
        }
    };

    // Convert price based on the selected currency
    const convertPrice = (priceInUSD: number) => {
        const convertedPrice = (priceInUSD * conversionRates[currency]).toFixed(2);
        
        // Use a simple conditional to determine the symbol
        const currencySymbol = currency === 'USD' ? '$' : '₦'; // Use '₦' for NGN
      
        return `${currencySymbol}${parseFloat(convertedPrice).toLocaleString()}`; // Format with thousands separator
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

    const isUserLoggedIn = () => {
        if (typeof window !== 'undefined') {
            // Only runs on the client side
            const token = localStorage.getItem('token');
            return !!token; // returns true if token exists
        }
        return false; // On the server, we can't check localStorage, so assume not logged in
    };

    const userDetails = isUserLoggedIn();

    const handleCheckout = () => {
        toggleCart(); // Close the cart
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={toggleCart}>
            <SheetContent className="md:w-[600px] w-full pb-12 max-h-[100vh] flex flex-col">
                <SheetHeader>
                    <SheetTitle>Your Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                    {totalItems === 0 ? (
                        <div className="text-center flex-col mx-auto py-36 flex items-center justify-center my-auto">
                            <Image src="/images/cart.svg" width={200} height={68} alt="cart" />
                            <p>Your cart is empty</p>
                            <p>Add something to make me happy</p>
                        </div>
                    ) : (
                        <>
                            {items.map((item: CartItem) => (
                                <div key={item._id} className="flex gap-4 py-4 border-b border-gray-200">
                                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover" />
                                    <div className="flex-1">
                                        <h4 className="text-[16px] font-karla font-bold">{item.name}</h4>
                                        <p className="text-sm text-gray-600">Color: {item?.color}</p>
                                        <p className="text-sm text-gray-600">Size: {item?.size}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => handleDecrement(item)}
                                                className="px-2 py-1 bg-gray-200 rounded text-lg font-semibold"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrement(item)}
                                                className="px-2 py-1 bg-gray-200 rounded text-lg font-semibold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="mt-2 text-lg font-bold"> {convertPrice(item.price * item.quantity)}</p>
                                    </div>
                                    <button onClick={() => removeItem(item._id)} className="text-red-500">
                                        <Trash />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                {totalItems > 0 &&
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium font-karla text-gray-800">
                            <p>Total Price</p>
                            <p>{convertPrice(totalPrice)}</p>
                        </div>
                        <p className="mt-0.5 text-[11px] text-gray-400">Shipping fee and taxes are calculated at checkout</p>
                        <div className="mt-6">
                            {userDetails ? (
                                <CheckoutNow items={items} totalPrice={totalPrice} totalItems={totalItems} />
                            ) : (
                                <Link href="/account" className="w-full" onClick={handleCheckout} >
                                    <span
                                        className="w-full text-center block bg-black text-white py-3 rounded-md hover:bg-gray-700"
                                    >
                                        Checkout
                                    </span>
                                </Link>
                            )}

                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                OR <button onClick={() => toggleCart()} className="font-medium font-karla text-primary hover:text-primary/50">Continue shopping</button>
                            </p>
                        </div>
                    </div>
                }
            </SheetContent>
        </Sheet>
    );
}

export default ShoppingCartModal;
