import React from 'react';
import { EliteClothesLanding } from '@/app/(root)/data'; // Adjust the path according to your structure
import Link from 'next/link';

const Shop = () => {
  return (
    <div className="p-6 mt-24">
      <h2 className="text-2xl font-bold mb-4 text-center font-karla">Shop All Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
        {EliteClothesLanding.length > 0 ? (
          EliteClothesLanding.map(item => (
            <div key={item.id} className="h-full justify-center mx-auto text-center p-4 ">
              <img src={item.img} alt={item.name} className="w-full h-54 object-cover rounded" />
              <h3 className="text-[18px] font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-700">
                from: <span className="font-bold text-red-500">${item.price}</span> 
              </p>
              <Link href={`/item/${item.id}`} className=" bg-black text-white py-2 px-4 rounded-md mt-2 inline-block">View Details</Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
