'use client'; // Required to use state in Next.js 14's App Router
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Card from '@/components/Card'; // Assuming Card component is imported

import {
  HiOutlineClipboardList,
  HiOutlineDownload,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiOutlineLogout,
} from 'react-icons/hi';
import { useCart } from '@/app/context/CartContext';
import AccountDetails from './_components/AccountDetails';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import UserOrders from './_components/UserOrder';

const Profile = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const { userDetails } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  // Tabs configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'payment-methods', label: 'Payment Methods' },
    { id: 'account-details', label: 'Account Details' },
    { id: 'wishlist', label: 'Wishlist' },
  ];

  useEffect(() => {
    setLoading(true)
    // Check for the token on component mount
    const token = localStorage.getItem('token');
    if (!token) {
      // If the token exists, redirect to the landing page
      router.push('/account'); // Change this to your landing page route
    } else {
      setLoading(false); // If no token, set loading to false
    }
  }, [router]);
 
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p><Loader2 size={"30px"}/></p></div>; // Loading state
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    router.push('/account'); // Redirect to login page
  };

  return (
    <>
      {/* Tabs */}
      <div className="w-full mt-24 md:mt-36 overflow-x-auto  px-3 md:max-w-6xl justify-center text-center mx-auto">
        <div className="flex space-x-4 p-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'whitespace-nowrap px-3  text-lg font-semibold rounded-full',
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4  md:max-w-6xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="p-4">
            <h1 className="md:text-3xl text-lg  font-bold font-karla mb-8 text-center">{userDetails && (
              <>
             Welcome <span className='font-karla text-red-600'> {userDetails?.firstname} {userDetails?.lastname}</span>
              </>
            )}</h1>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div onClick={() => setActiveTab('orders')}>
                <Card title="Orders" icon={<HiOutlineClipboardList />} />
              </div>
              <div onClick={() => setActiveTab('downloads')}>
                <Card title="Downloads" icon={<HiOutlineDownload />} />
              </div>
              <div onClick={() => setActiveTab('addresses')}>
                <Card title="Addresses" icon={<HiOutlineLocationMarker />} />
              </div>
              <div onClick={() => setActiveTab('payment-methods')}>
                <Card title="Payment Methods" icon={<HiOutlineCreditCard />} />
              </div>
              <div onClick={() => setActiveTab('account-details')}>
                <Card title="Account Details" icon={<HiOutlineUserCircle />} />
              </div>
              <div onClick={() => setActiveTab('wishlist')}>
                <Card title="Wishlist" icon={<HiOutlineHeart />} />
              </div>
              <div onClick={handleLogout}>
                <Card title="Logout" icon={<HiOutlineLogout />} />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-center">Orders</h2>
            <UserOrders/>
          </div>
        )}
        {activeTab === 'downloads' && (
          <div>
            <h2 className="text-2xl font-bold">Downloads Content</h2>
            <p>Here you can download your files.</p>
          </div>
        )}
        {activeTab === 'addresses' && (
          <div>
            <h2 className="text-2xl font-bold">Addresses Content</h2>
            <p>Here you can manage your addresses.</p>
          </div>
        )}
        {activeTab === 'payment-methods' && (
          <div>
            <h2 className="text-2xl font-bold">Payment Methods Content</h2>
            <p>Here you can manage your payment methods.</p>
          </div>
        )}
        {activeTab === 'account-details' && (
          <div className='mx-auto justify-center'>
            <AccountDetails userDetails={userDetails}/>
          </div>
        )}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-2xl font-bold">Wishlist Content</h2>
            <p>Here is your wishlist.</p>
          </div>
        )}
        {activeTab === 'logout' && (
          <div>
            <h2 className="text-2xl font-bold">Logout Content</h2>
            <p>You have logged out successfully.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
