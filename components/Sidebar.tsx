"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Next.js 14 app router

const Sidebar = () => {
  const pathname = usePathname(); // Hook to get the current path

  return (
    <aside className="w-1/4 p-4 border-r border-gray-300">
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/dashboard">
              <span className={`text-lg font-semibold ${pathname === '/dashboard' ? 'text-blue-500' : 'text-gray-700'}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/orders">
              <span className={`text-lg font-semibold ${pathname === '/orders' ? 'text-blue-500' : 'text-gray-700'}`}>
                Orders
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/downloads">
              <span className={`text-lg font-semibold ${pathname === '/downloads' ? 'text-blue-500' : 'text-gray-700'}`}>
                Downloads
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/addresses">
              <span className={`text-lg font-semibold ${pathname === '/addresses' ? 'text-blue-500' : 'text-gray-700'}`}>
                Addresses
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/payment-methods">
              <span className={`text-lg font-semibold ${pathname === '/payment-methods' ? 'text-blue-500' : 'text-gray-700'}`}>
                Payment methods
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/account-details">
              <span className={`text-lg font-semibold ${pathname === '/account-details' ? 'text-blue-500' : 'text-gray-700'}`}>
                Account details
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/wishlist">
              <span className={`text-lg font-semibold ${pathname === '/wishlist' ? 'text-blue-500' : 'text-gray-700'}`}>
                Wishlist
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/logout">
              <span className={`text-lg font-semibold ${pathname === '/logout' ? 'text-blue-500' : 'text-gray-700'}`}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
