"use client";

import { client } from '@/lib/sanity';
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the structure of the cart item
export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
    color: string
    size: string
}
export interface UserDetails {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    phonenumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
}

interface CartContextProps {
    cartItems: CartItem[];
    userDetails: UserDetails | null; // Add userDetails here
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    checkoutSingleItem: (id: string) => CartItem | undefined; 
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getCartDetails: () => { items: CartItem[]; totalItems: number; totalPrice: number };
    isCartOpen: boolean;
    toggleCart: () => void;
}


const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // State for user details

    useEffect(() => {
        // Fetch user details from Sanity when the component mounts
        const fetchUserDetails = async () => {
            try {
                // Replace with the actual user ID you want to fetch
                const userId = '8RzK8YEYmgGJZM7UREggPA'; // Example user ID
                const query = `*[_type == "user" && _id == $userId][0]{
                    _id,
                    firstname,
                    lastname,
                    email,
                    username,
                    phonenumber,
                    address,
                    city,
                    state,
                    country
                }`;

                const params = { userId };
                const data = await client.fetch(query, params);
                setUserDetails(data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };

        fetchUserDetails();
    }, []); 

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((i) => i._id === item._id);
            if (existingItemIndex > -1) {
                // If item exists, update its quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity = item.quantity; // Update quantity
                return updatedItems;
            }
            // If item does not exist, add it to the cart
            return [...prevItems, item];
        });
    };

    const removeItem = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev); // Toggle cart visibility
    };

    const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0); // Function to get total items

    const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Function to get total price

    const getCartDetails = () => {
        const totalItems = getTotalItems();
        const totalPrice = getTotalPrice();
        return { items: cartItems, totalItems, totalPrice };
    };
// Function to handle single item checkout
const checkoutSingleItem = (id: string): CartItem | undefined => {
    const item = cartItems.find(item => item._id === id);
    if (item) {
        // Optionally, you can remove the item from the cart after checkout
        // removeItem(id);

        // Return the item details for further processing (e.g., payment)
        return item;
    }
    return undefined;
};
    return (
        <CartContext.Provider value={{ cartItems, userDetails, checkoutSingleItem, addItem, removeItem, clearCart, toggleCart, getTotalItems, getTotalPrice, getCartDetails, isCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};
