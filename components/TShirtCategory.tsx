// components/TShirtCategory.js

import { EliteClothesLanding } from '@/app/(root)/data';
import React from 'react';
import Link from 'next/link';

const TShirtCategory = () => {
    // Filter items that are in the "t-shirt" category
    const tShirtItems = EliteClothesLanding.filter(item => item.category === 't-shirt').slice(0, 4);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center font-karla">T-Shirts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto gap-6">
                {tShirtItems.length > 0 ? (
                    tShirtItems.map(item => (

                        <div key={item.id} className="h-full justify-center mx-auto text-center p-4">
                            <img src={item.img} alt={item.name} className="w-[300px] h-[375px] object-cover rounded" />
                            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                            <p className="text-gray-700">from: <span className="font-bold text-red-500">${item.price}</span></p>

                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No t-shirts available at the moment.</p>
                )}
            </div>
            <div className="text-center">
                <Link href={`/shirts`}>
                    <span className="mt-4 inline-block bg-black text-white py-2 px-4 rounded hover:bg-blue-600">
                        View Details
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default TShirtCategory;
