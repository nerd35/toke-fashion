"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component

const Carousel = () => {
    const images = [
        {
            src: '/images/felabanner.jpg',
            title: 'Exclusive Elites Tees',
            description: 'Enjoy up to 30% off when you get two',
        },
        {
            src: '/images/banner_image2.jpg',
            title: 'New Collection',
            description: 'Latest Arrivals',
        },
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Automatically change the slide every 7 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 7000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative w-full mt-20 overflow-hidden h-screen">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="relative w-full h-screen flex-shrink-0" key={index}>
                        <Image
                            src={image.src}
                            alt={`Slide ${index}`}
                            layout="fill" // Use fill layout
                            objectFit="cover" // Maintain aspect ratio and cover the area
                            className="w-full h-full" // Full width and height
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center md:pl-32 justify-center md:items-start text-center text-white p-4">
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">{image.title}</h2>
                            <p className="text-md md:text-xl">{image.description}</p>
                            <Link href="/shop" className='bg-white py-3 w-fit px-5 text-black font-karla font-bold mt-5 rounded-md'>Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
