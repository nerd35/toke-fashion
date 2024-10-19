"use client";

import { useState } from 'react';
import { EliteClothesLanding } from '@/app/(root)/data';
import Image from 'next/image';
import React from 'react';

const FelaTee = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsToShow = 4;

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

  return (
    <div className="relative">
      <div className="overflow-x-hidden flex">
        <div
          className="flex transition-transform gap-4 py-6"
          style={{ transform: `translateX(-${scrollIndex * (100 / itemsToShow)}%)` }}
        >
          {EliteClothesLanding?.map((item) => (
            item.discount > 0 && (
              <div key={item.id} className="flex-shrink-0  px-6 border-gray-50 rounded-md w-64 h-auto relative">
                <div className="relative w-full h-72"> {/* Set a fixed height for the image container */}
                  <Image
                    src={item.img}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <span className="absolute top-4 left-4 bg-red-400 text-white text-sm font-karla py-1 px-2 rounded">
                    Save {item.discount}%
                  </span>
                </div>
                <p className="text-center text-[15px] font-karla text-[#2b2b2b]">{item.name}</p>
                <p className='text-red-300 font-karla text-center'>${item.price}</p>
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

export default FelaTee;
