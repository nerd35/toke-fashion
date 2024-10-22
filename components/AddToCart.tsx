"use client";

import { useCart } from '@/app/context/CartContext';
import { urlFor } from '@/lib/sanity';

export interface ProductCart {
    name: string;
    price: number;
    color: string;
    description: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: any;
    quantity: number;
    _id: string;
    size: string
}

function AddToCart({ color, img, name, price, description, quantity, _id, size }: ProductCart) {
    const { addItem, toggleCart } = useCart();
    const product = {
        name: name,
        description: description,
        price: price,
        color: color,
        img: urlFor(img).url(),
        quantity: quantity,
        _id: _id,
        size: size,
    };

    return (
        <button
            onClick={() => {
                addItem(product);  // Call addItem
                toggleCart();      // Call toggleCart to change cart visibility
            }}
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600"
        >
            Add to cart
        </button>
    );
}

export default AddToCart;
