"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Carousel = () => {
    const images = [
        {
            src: '/images/felabanner.jpg',
            title: 'Exculsive Elites Tees',
            description: 'Enjoy upto 30% of when you get two',
        },
        {
            src: '/images/banner_image2.jpg',
            title: 'New Collection',
            description: 'Latest Arrivals',
        },
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Automatically change the slide every 12 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 12000); // Change slide every 12 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

   

    return (
        <div className="relative w-full mt-20 overflow-hidden h-screen">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Change to 50%
            >
                {images.map((image, index) => (
                    <div className="relative w-full h-screen flex-shrink-0" key={index}>
                        <img
                            src={image.src}
                            alt={`Slide ${index}`}
                            className="w-full h-screen object-cover" // Maintain full height and width
                        />
                        <div className="absolute inset-0 bg-black md:pl-32 bg-opacity-30 flex flex-col items-Center justify-center md:items-start  text-center text-white p-4">
                            <h2 className="text-4xl font-bold mb-4">{image.title}</h2>
                            <p className="text-xl">{image.description}</p>
                            <Link href="/" className='bg-white py-3 w-fit px-5 text-black font-karla font-bold mt-5 rounded-md'>Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            {/* <button
                onClick={prevSlide}
                className="absolute mt-32 left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md z-10"
            >
                <Image src="/left.png" alt="Previous" width={50} height={50} />
            </button> */}

            {/* Next Button */}
            {/* <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md z-10"
            >
                <Image src="/right.png" alt="Next" width={50} height={50} />
            </button> */}
        </div>
    );
};

export default Carousel;
