"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  FaHome, FaShoppingCart, FaUserAlt, FaSearch, FaBars, FaTimes, FaWhatsapp,
  // FaWhatsapp 
} from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [loading, setLoading] = useState(false); // Loading state for currency change
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] = useState(false);
  const [isMobileCollectionDropdownOpen, setIsMobileCollectionDropdownOpen] = useState(false);

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Check if a route is active
  const isActive = (path: string) => pathname === path;

  // Handle currency change with a loader
  const handleCurrencyChange = (selectedCurrency: 'USD' | 'NGN') => {
    setLoading(true); // Start loading when currency is changed
    setTimeout(() => {
      setCurrency(selectedCurrency);
      localStorage.setItem('preferredCurrency', selectedCurrency);
      setLoading(false); // Stop loading after the delay
      window.location.reload();
    }, 500); // Simulate a 500ms delay for price update
  };

  // Retrieve the saved currency selection from localStorage on component mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency') as 'USD' | 'NGN';
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Check if user is logged in (you can adjust this condition based on your authentication logic)
  const isUserLoggedIn = () => {
    if (typeof window !== 'undefined') {
      // Only runs on the client side
      const token = localStorage.getItem('token');
      return !!token; // returns true if token exists
    }
    return false; // On the server, we can't check localStorage, so assume not logged in
  };

  // Determine if user details exist (adjust based on your app's logic)
  const userDetails = isUserLoggedIn();


  return (
    <header className="fixed w-full top-0 bg-white z-50 ">
      {/* Top Section for Desktop and Mobile */}
      <nav className="flex justify-between items-center px-6 md:px-16">
        {/* Logo */}
        <Link href="/">
          <Image src="/cloths/toke-logo1.png" alt="logo" width={250} height={64} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/new-arrival">
            <span
              className={`text-[15px] font-karla font-[700] ${isActive('/new-arrival') ? 'text-blue-500' : 'text-[#2b2b2b]'}`}
            >
              New Arrivals
            </span>
          </Link>
          <Link href="/men">
            <span
              className={`text-[15px] font-karla font-[700] ${isActive('/men') ? 'text-blue-500' : 'text-[#2b2b2b]'}`}
            >
              Men
            </span>
          </Link>
          <Link href="/women">
            <span
              className={`text-[15px] font-karla font-[700] ${isActive('/women') ? 'text-blue-500' : 'text-[#2b2b2b]'}`}
            >
              Women
            </span>
          </Link>
          <div className="relative">
            <button onClick={() => setIsCollectionDropdownOpen(!isCollectionDropdownOpen)} className={`text-[15px] font-karla font-[700] flex items-center ${isActive('/collection') ? 'text-blue-500' : 'text-[#2b2b2b]'}`}>
              <span>Collection</span> <ChevronDown className='ms-1 text-[8px]' />
            </button>
            
            {isCollectionDropdownOpen && (
              <div className="absolute z-10 bg-white w-[200px] py-2 shadow-2xl rounded mt-2">
                <Link href="/collection/tebc">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white">TEBC</span>
                </Link>
                {/* <Link href="/collection/Accessories">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white">Other Collection</span>
                </Link> */}
                {/* Add more links as needed */}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Selector with Loader */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="loader border-t-2 border-blue-500 border-solid rounded-full animate-spin h-6 w-6"></div>
            ) : (
              <select
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value as 'USD' | 'NGN')}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded px-2 py-1"
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
              </select>
            )}
          </div>

          <FaSearch className="text-sm cursor-pointer" />
          <div className="hidden md:flex items-center gap-3">
            {userDetails ? (
              <Link href="/profile">
                <span
                  className={`flex gap-2 font-karla items-center text-sm ${isActive('/profile') ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  Profile
                  <FaUserAlt className="text-md" />
                </span>
              </Link>
            ) : (
              <Link href="/account">
                <span
                  className={`flex gap-2 font-karla items-center text-sm ${isActive('/account') ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  Account
                  <FaUserAlt className="text-md" />
                </span>
              </Link>
            )}
            <div onClick={() => toggleCart()} className="relative">
              <span
                className={`flex gap-1 font-karla items-center text-sm ${isActive('/cart') ? 'text-blue-500' : 'text-gray-700'}`}
              >
                Cart
                <FaShoppingCart className="text-md" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="md:hidden" onClick={toggleDrawer}>
            {isDrawerOpen ? <FaTimes className="text-lg cursor-pointer" /> : <FaBars className="text-lg cursor-pointer" />}
          </div>
        </div>
      </nav>

      {/* Drawer (Side Sheet) */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-40 transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <nav className="flex justify-between items-center   px-6 py-3">
        
        

        {/* Hamburger Menu */}
        <button onClick={toggleDrawer} className="text-xl md:hidden">
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-40 transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {/* Close Icon */}
          <button onClick={toggleDrawer} className="text-xl self-end">
            <FaTimes />
          </button>
          <Link href="/">
          <Image src="/cloths/toke-logo1.png" alt="logo" width={250} height={64} />
        </Link>
          

          <Link onClick={toggleDrawer} href="/shop" className="text-[15px] border-t  py-2 font-karla font-[700] text-[#474747]">
            Shop
          </Link>

          <Link href="/new-arrivals" onClick={toggleDrawer} className="text-[15px] border-t border-b py-3 font-karla font-[700] text-[#474747]">
            New Arrivals
          </Link>

          <Link href="/men" onClick={toggleDrawer} className="text-[15px]  border-b py-2 font-karla font-[700] text-[#474747]">
            Men
          </Link>

          <Link href="/women" onClick={toggleDrawer} className="text-[15px]  border-b py-2 font-karla font-[700] text-[#474747]">
            Women
          </Link>
         

          <button onClick={() => setIsMobileCollectionDropdownOpen(!isMobileCollectionDropdownOpen)} className="flex justify-between items-center text-[15px] font-karla font-[700] text-[#2b2b2b]">
            Collections <ChevronDown className="text-sm" />
          </button>
          {isMobileCollectionDropdownOpen && (
              <div className="">
                <Link href="/collection/tebc" onClick={toggleDrawer}>
                  <span className="text-[15px] block w-full pt-2 font-karla font-[700] border-t text-[#2b2b2b]">TEBC</span>
                </Link>
                {/* <Link href="/collection/Accessories">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white">Other Collection</span>
                </Link> */}
                {/* Add more links as needed */}
              </div>
            )}
          <Link href="/account" onClick={toggleDrawer} className="text-[15px] border-t border-b py-3 font-karla font-[700] text-[#474747]">
            Log In/Create Account
          </Link>

          {/* <button onClick={toggleCart} className=" flex justify-between items-center mt-36 space-x-2">
          <span className="text-[15px] font-karla font-[700] text-[#2b2b2b]">CART {totalItems}</span>
          <FaShoppingCart className="text-lg" />
        </button> */}
          
        </div>
      </div>
      </div>
      <div className='fixed bottom-[80px] z-50 right-2'>
        <Link href="https://wa.me/message/SUPMHAZ6QTFZL1" target='_blank' ><FaWhatsapp size={40} className='bg-black p-2 rounded-full text-white' /></Link>
      </div>
      {/* Bottom Mobile Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around py-3 border-t-2 shadow-lg">
        <Link href="/">
          <span className={`flex flex-col font-karla items-center text-sm ${isActive('/') ? 'text-blue-500' : 'text-gray-700'}`}>
            <FaHome className="text-md" />
            Home
          </span>
        </Link>
        <Link href="/shop">
          <span className={`flex flex-col font-karla items-center text-sm ${isActive('/shop') ? 'text-blue-500' : 'text-gray-700'}`}>
            <FaShoppingCart className="text-md" />
            Shop
          </span>
        </Link>
        <div onClick={() => toggleCart()} className="relative">
          <span className={`flex flex-col font-karla items-center text-sm ${isActive('/cart') ? 'text-blue-500' : 'text-gray-700'}`}>
            <FaShoppingCart className="text-md" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1  bg-red-500 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </span>
        </div>
        {userDetails ? (
          <Link href="/profile">
            <span className={`flex flex-col font-karla items-center text-sm ${isActive('/profile') ? 'text-blue-500' : 'text-gray-700'}`}>
              <FaUserAlt className="text-md" />
              Profile
            </span>
          </Link>
        ) : (
          <Link href="/account">
            <span className={`flex flex-col font-karla items-center text-sm ${isActive('/account') ? 'text-blue-500' : 'text-gray-700'}`}>
              <FaUserAlt className="text-md" />
              Account
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
