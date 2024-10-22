"use client"
import { urlFor } from '@/lib/sanity';
import React, { useState } from 'react';

interface IImage {
  asset: {
    url: string; // Adjust based on your actual structure
  };
}

interface IAppProps {
  img: IImage[];  // Array of image objects
  item: string;
}

const ImageGallery: React.FC<IAppProps> = ({ img, item }) => {
  // Automatically select the first image from the array as the initial selected image
  const [selectedImage, setSelectedImage] = useState<string>(urlFor(img[0]?.asset.url).url());


  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Image */}
      <div className=" relative w-full max-w-lg">
        <img
          src={urlFor(selectedImage).url()}
          alt="Selected"
          className="object-cover w-full h-auto "
        />
        {item === "Yes" && (

          <span className="absolute mt-5 top-4 left-4 bg-red-700 text-white text-sm font-karla py-1 px-3 rounded">
            {item === "Yes" && <p>Hot</p>}
          </span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-4 mt-4">
        {img.map((imageUrl, index) => (
           <img
           key={index}
           src={urlFor(imageUrl.asset.url).url()} // Use the URL from the asset
           alt={`Thumbnail ${index}`}
           onClick={() => setSelectedImage(imageUrl.asset.url)} // Update the selected image on click
           className={`cursor-pointer w-24 h-24 object-cover rounded-lg border-2 ${selectedImage === imageUrl.asset.url ? 'border-black' : 'border-transparent'
             }`}
         />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
