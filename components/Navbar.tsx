"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import { FaHome, FaShoppingCart, FaUserAlt, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Function to toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Function to check if a route is active
  const isActive = (path: string) => {
    return pathname === path; // Compare current path with the path
  };

  return (
    <header className="fixed w-full top-0 bg-white z-50 shadow-md">
      {/* Top Section for Desktop and Mobile */}
      <div className="flex justify-between items-center  px-6 md:px-16">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo-toke1.jpg" alt='logo' width={84} height={64} />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <span
              className={`text-[15px] font-karla font-[700] ${
                isActive('/') ? 'text-blue-500' : 'text-[#2b2b2b]'
              }`}
            >
              New Arrivals
            </span>
          </Link>
          <Link href="/men">
            <span
              className={`text-[15px] font-karla font-[700] ${
                isActive('/men') ? 'text-blue-500' : 'text-[#2b2b2b]'
              }`}
            >
              Men
            </span>
          </Link>
          <Link href="/women">
            <span
              className={`text-[15px] font-karla font-[700] ${
                isActive('/women') ? 'text-blue-500' : 'text-[#2b2b2b]'
              }`}
            >
              Women
            </span>
          </Link>
          <Link href="/collection">
            <span
              className={`text-[15px] font-karla font-[700] ${
                isActive('/collection') ? 'text-blue-500' : 'text-[#2b2b2b]'
              }`}
            >
              Collection
            </span>
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          <FaSearch className="text-sm cursor-pointer" />
          <div className='hidden md:flex items-cener gap-3'>
          <Link href="/account">
          <span
            className={`flex gap-2 font-karla items-center text-sm ${
              isActive('/account') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            Account
            <FaUserAlt className="text-md" />
          </span>
        </Link>
          <Link href="/cart">
          <span
            className={`flex  gap-1 font-karla items-center text-sm ${
              isActive('/cart') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            Cart
            <FaShoppingCart className="text-md" />
          </span>
        </Link>
          </div>

          <div className="md:hidden" onClick={toggleDrawer}>
            {isDrawerOpen ? (
              <FaTimes className="text-lg2xl cursor-pointer" />
            ) : (
              <FaBars className="text-lg cursor-pointer" />
            )}
          </div>
        </div>
      </div>

      {/* Drawer (Side Sheet) */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-40 transition-transform transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
        <Link href="/">
          <Image src="/images/logo-toke1.jpg" alt='logo' width={154} height={64} />
        </Link>
          <Link href="/">
            <span
              onClick={toggleDrawer} // Close the drawer when a link is clicked
              className={`text-xl font-semibold cursor-pointer ${
                isActive('/') ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              Home
            </span>
          </Link>
          <Link href="/shop">
            <span
              onClick={toggleDrawer}
              className={`text-xl font-semibold cursor-pointer ${
                isActive('/shop') ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              Shop
            </span>
          </Link>
          <Link href="/cart">
            <span
              onClick={toggleDrawer}
              className={`text-xl font-semibold cursor-pointer ${
                isActive('/cart') ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              Cart
            </span>
          </Link>
          <Link href="/account">
            <span
              onClick={toggleDrawer}
              className={`text-xl font-semibold cursor-pointer ${
                isActive('/account') ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              Account
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Mobile Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around py-3 border-t-2 shadow-lg">
        <Link href="/">
          <span
            className={`flex flex-col font-karla items-center text-sm ${
              isActive('/') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <FaHome className="text-md" />
            Home
          </span>
        </Link>
        <Link href="/shop">
          <span
            className={`flex flex-col font-karla items-center text-sm ${
              isActive('/shop') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <FaShoppingCart className="text-md" />
            Shop
          </span>
        </Link>
        <Link href="/cart">
          <span
            className={`flex flex-col font-karla items-center text-sm ${
              isActive('/cart') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <FaShoppingCart className="text-md" />
            Cart
          </span>
        </Link>
        <Link href="/account">
          <span
            className={`flex flex-col font-karla items-center text-sm ${
              isActive('/account') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <FaUserAlt className="text-md" />
            Account
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
