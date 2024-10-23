import React, { useEffect, useState } from 'react';
import { displayUserOrders } from '@/app/api/sanity';
import { useCart } from '@/app/context/CartContext';
import moment from 'moment'
const conversionRates = {
    USD: 1,
    NGN: 1830, // Example rate
  };

const UserOrders = () => {
    const { userDetails } = useCart();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD'); // Default currency

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await displayUserOrders(userDetails?._id);
                setOrders(fetchedOrders);
            } catch (err) {
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userDetails?._id]);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const convertPrice = (priceInUSD: number) => {
        const convertedPrice = (priceInUSD * conversionRates[currency]).toFixed(2);
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency === 'USD' ? 'USD' : 'NGN', // Change currency symbol based on selection
        }).format(parseFloat(convertedPrice));
    };
    
      // Fetch preferred currency from localStorage on component mount
      useEffect(() => {
        const savedCurrency = localStorage.getItem('preferredCurrency') as 'USD' | 'NGN';
        if (savedCurrency) {
          setCurrency(savedCurrency);
        }
    
        // Add an event listener to detect changes to localStorage
        const handleStorageChange = (event: StorageEvent) => {
          if (event.key === 'preferredCurrency' && event.newValue) {
            setCurrency(event.newValue as 'USD' | 'NGN');
          }
        };
    
        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const shortenOrderId = (id) => {
        return `${id.slice(0, 8)}...`; // Truncate to first 8 characters and add ellipsis
    };

    return (
        <div className="container mx-auto p-4">
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="min-w-full bg-[#f8f9fa] shadow-md py-4">
                    <thead>
                        <tr>
                            <th className="hidden text-start md:block py-2 px-4 text-[13px] font-bold font-karla border-b">Order ID</th>
                            <th className="py-2 text-start px-4 text-[13px] font-bold font-karla border-b">Date</th>
                            <th className="py-2 text-start px-4 text-[13px] font-bold font-karla border-b">Total Amount</th>
                            <th className="hidden text-start  md:block py-2 px-4 text-[13px] font-bold font-karla border-b">Status</th>
                            <th className="py-2 px-4 text-[13px] font-bold font-karla border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-100">
                                <td className=" hidden md:block font-semibold py-2 px-4 text-[13px] font-karla border-b">#{shortenOrderId(order._id)}</td>
                                <td className="py-2 px-4 text-[13px] font-karla border-b">{moment(order._createdAt).format("ll")}</td>
                                <td className="py-2 px-4 text-[13px] font-karla border-b">{convertPrice(order.totalAmount)}</td>
                                <td className="hidden font-bold md:block py-2 px-4 text-[12px] font-karla border-b">
                                    <span
                                        className={`px-3 py-1 rounded-full text-white ${order.status === 'successful' ? 'bg-green-500' :
                                            order.status === 'pending' ? 'bg-orange-500' :
                                                order.status === 'failed' ? 'bg-red-500' :
                                                    'bg-green-500' // Fallback color
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 text-[13px] font-karla text-center border-b">
                                    <button
                                        onClick={() => handleViewOrder(order)}
                                        className="text-red-500 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal background */}
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>

                    {/* Modal content */}
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-5xl relative z-10">
                        {/* Modal Header */}
                        <div className="flex items-center mb-4">
                            <img
                                src={selectedOrder?.orderDetails[0]?.img || '/default-image.jpg'} // Fallback to a default image if none found
                                alt={selectedOrder?.orderDetails[0]?.name || 'Order item image'}
                                className="w-20 h-16 object-cover mr-4 rounded"
                            />
                            <div>
                                <div className="flex  flex-col gap-2 mb-1">
                                    <div
                                        className={`px-3 py-1 rounded-lg w-fit text-white ${selectedOrder.status === 'successful' ? 'bg-green-500' :
                                            selectedOrder.status === 'pending' ? 'bg-orange-500' :
                                                selectedOrder.status === 'failed' ? 'bg-red-500' :
                                                    'bg-green-500' // Fallback color
                                            }`}
                                    >
                                        {selectedOrder.status}
                                    </div>
                                    <h3 className="text-[14px] font-bold">Order #{shortenOrderId(selectedOrder?._id)}</h3>
                                </div>
                                
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p><strong>Item:</strong> {selectedOrder?.itemName}</p>
                                <p><strong>Start Time:</strong> {new Date(selectedOrder?.startTime).toLocaleString()}</p>
                            </div>
                            <div>
                                <p><strong>Courier:</strong> {selectedOrder?.courier}</p>
                                <p><strong>Address:</strong> {selectedOrder?.address}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex mt-6 space-x-4">
                            <button className="bg-black text-white py-2 px-4 rounded">Export Details</button>
                            <button className="border border-black py-2 px-4 rounded">Request Confirmation</button>
                            <button className="text-red-500 border border-red-500 py-2 px-4 rounded">Cancel Order</button>
                        </div>

                        {/* Order Items List */}
                        <h4 className="mt-4 font-semibold">Order Items:</h4>
                        <div className="  ml-5 mt-2">
                            {selectedOrder?.orderDetails.map(item => (
                                <div key={item._id} className='flex items-center gap-4 py-2'>
                                    <img
                                src={item?.img || '/default-image.jpg'} // Fallback to a default image if none found
                                alt={item?.name || 'Order item image'}
                                className="w-20 h-16 object-cover mr-4 rounded"
                            />
                            <div>

                            <p className='text-[14px] font-karla text-gray-500'>Name: <span className='font-bold'>{item.name}</span></p>
                            <p className='text-[14px] font-karla text-gray-500'>Price: <span className='font-bold'>{convertPrice(item.price)}</span></p>
                            <p className='text-[14px] font-karla text-gray-500'>Quantity: <span className='font-bold'>{item.quantity}</span></p>
                            <p className='text-[14px] font-karla text-gray-500'>Color: <span className='font-bold'>{item.color}</span></p>
                                     
                            </div>
                                </div>
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="mt-4 text-red-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserOrders;
