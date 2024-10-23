'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { getCountryData } from '@/app/api/sanity';
import { toast } from 'sonner';
import { PaystackButton } from 'react-paystack';

interface CountryProps {
    code: string
    name: string

}

const conversionRates = {
    USD: 1830, // Example rate for converting USD to NGN
    NGN: 1, // 1 NGN is 1 NGN
};

interface OrderProps {
    name: string,
    price: number,

}


export default function CheckoutPage() {
    const { cartItems, userDetails, getCartDetails } = useCart(); // Assuming userDetails comes from useCart
    const {  totalPrice } = getCartDetails();
    const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
    interface OrderDetails {
        userId: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        country: string;
        paymentMethod: 'paystack' | 'bank';
        totalAmount: number;
        status: 'pending' | 'success';
        orderDetails: OrderProps[];
    }
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState<'paystack' | 'bank' | null>('paystack');
    const [products, setProducts] = useState<[]>([]); // State to store fetched products
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: [] = await getCountryData();
                console.log('Fetched data:', data);
                if (Array.isArray(data)) {
                    setProducts(data);
                    console.log('Products after fetching:', data);
                } else {
                    console.warn('Expected an array for the products, received:', data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    const convertPriceToNGN = (price: number): number => {
        return Math.round(price * conversionRates[currency]); // Convert to Naira and round to nearest whole number
    };
    
    // Fetch preferred currency from localStorage on component mount
    useEffect(() => {
        const savedCurrency = localStorage.getItem('preferredCurrency') as 'USD' | 'NGN';
        if (savedCurrency) {
            setCurrency(savedCurrency);
        }
    
        // Event listener for localStorage changes
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'preferredCurrency' && event.newValue) {
                setCurrency(event.newValue as 'USD' | 'NGN');
            }
        };
    
        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    console.log(products)

    const handleToggle = (paymentMethod: 'paystack' | 'bank') => {
        if (selectedPayment === paymentMethod) {
            setSelectedPayment(null); // Collapse the accordion if clicked again
        } else {
            setSelectedPayment(paymentMethod); // Expand the clicked accordion
        }
    };

    // State to manage the delivery method
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');

    // State to manage user info if not logged in
    const [userInfo, setUserInfo] = useState({
        firstname: '',
        address: '',
        phone: '',
        city: '',
        country: '',
        state: '',
        lastname: '',
        email: ''


    });

    // Check if user is logged in
    const isUserLoggedIn = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            return !!token; // returns true if token exists
        }
        return false;
    };

    useEffect(() => {
        if (isUserLoggedIn()) {
            // If user is logged in, populate userInfo with userDetails
            setUserInfo({
                firstname: userDetails?.firstname || '',
                address: userDetails?.address || '',
                phone: userDetails?.phonenumber || '',
                city: userDetails?.city || '',
                state: userDetails?.state || '',
                lastname: userDetails?.lastname || '',
                country: userDetails?.country || '',
                email: userDetails?.email || '',


            });
        }
    }, [userDetails]);


    // Handle Paystack close
    const handlePaystackClose = () => {
        toast.info('Transaction cancelled.');
    };
    // Handle successful Paystack payment
    const handlePaystackSuccess = async () => {
        const totalAmountInNGN = convertPriceToNGN(totalPrice);
        // Create order after successful payment
        const orderData: OrderDetails = {
            userId: userDetails?._id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            city: userInfo.city,
            state: userInfo.state,
            country: userInfo.country,
            paymentMethod: 'paystack',
            totalAmount: totalAmountInNGN,
            status: 'success',
            orderDetails: cartItems,
        };

        try {
            // Call your API to create order in Sanity
            await fetch('/api/createOrder', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });

            toast.success('Payment successful! Order created.');
            router.push('/paystack/success');
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Error creating order. Please try again.');
        }
    };

    // Handle bank transfer order creation
    const handleBankTransfer = async () => {
        const orderData: OrderDetails = {
            userId: userDetails?._id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            city: userInfo.city,
            state: userInfo.state,
            country: userInfo.country,
            paymentMethod: 'bank',
            totalAmount: totalPrice,
            status: 'pending',
            orderDetails: cartItems,
        };

        try {
            // Create order in Sanity with status 'pending'
            await fetch('/api/createOrder', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });

            toast.success('Order created. Please complete your bank transfer.');
            router.push('/confirmation');
        } catch (error) {
            console.error('Error creating bank transfer order:', error);
            toast.error('Error creating order. Please try again.');
        }
    };

    useEffect(() => {
        console.log('Selected Payment Method:', selectedPayment);
    }, [selectedPayment]);

    // Paystack component props
    const paystackProps = {
        email: userInfo.email,
        amount: convertPriceToNGN(totalPrice) * 100, // Paystack accepts amount in kobo
        publicKey,
        text: 'Pay Now',
        onSuccess: handlePaystackSuccess,
        onClose: handlePaystackClose,
    };


    return (
        <div className="checkout-page grid grid-cols-1 md:grid-cols-2 mt-16 mb-10 gap-6 p-6 h-full">
            {/* Left: Checkout Form */}
            <div className="checkout-form p-6 py-16 rounded-md h-full overflow-auto bg-white border shadow-sm">
                <h1 className="text-2xl font-semibold mb-6">Contact</h1>
                <div className="space-y-6">
                    {/* User Information */}
                    <div className="user-info">
                        <label className="block mb-4">
                            Email or mobile phone number
                            <input
                                type="text"
                                value={userInfo?.email}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, email: e.target.value })
                                } // Update state
                                className="border border-gray-300 p-3 rounded w-full mt-2"
                                required
                            />
                        </label>
                        
                    </div>

                    {/* Delivery Method */}
                    <div className="delivery-method mt-8">
                        <h2 className="text-xl font-semibold mb-2">Delivery</h2>
                        <label className="block mb-2 flex items-center space-x-3">
                            <input
                                type="radio"
                                value="ship"
                                checked={deliveryMethod === 'ship'}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span>Ship</span>
                        </label>
                        <label className="block mb-2 flex items-center space-x-3">
                            <input
                                type="radio"
                                value="pickup"
                                checked={deliveryMethod === 'pickup'}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span>Pickup in store</span>
                        </label>
                    </div>

                    {/* Store Locations */}
                    {/* <div className="store-locations mt-8">
            <h2 className="text-xl font-semibold">Store locations</h2>
            <p>There is 1 store with stock close to your location</p>
            <div className="border mt-2 p-4 rounded-lg">
              <p className="font-bold">ASHLUXURY, 22b Admiralty Way, Lekki. (9.9 km)</p>
              <p>Usually ready in 4 hours</p>
            </div>
          </div> */}

                    <div className="payment-method">
                        <h2 className="text-xl font-semibold mb-4">Payment</h2>
                        <p className="text-gray-600 mb-4 text-[14px] font-karla">All transactions are secure and encrypted.</p>

                        {/* Paystack Accordion */}
                        <div className="accordion-item border rounded-lg mb-4">
                            <div
                                className="accordion-header cursor-pointer p-4 flex justify-between items-center"
                                onClick={() => handleToggle('paystack')}
                            >
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="paystack"
                                        checked={selectedPayment === 'paystack'}
                                        onChange={() => handleToggle('paystack')}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-semibold text-[14px] font-karla">Paystack</span>
                                </label>
                                <div className="flex items-center">
                                    <img
                                        src="/images/master.svg"
                                        alt="Paystack payment icons"
                                        className="w-auto h-6 mr-3"
                                    />
                                    <img
                                        src="/images/visa.svg"
                                        alt="Paystack payment icons"
                                        className="w-auto h-6 mr-3"
                                    />
                                    <img
                                        src="/images/mtn_mobile_money.svg"
                                        alt="Paystack payment icons"
                                        className="w-auto h-6 mr-3"
                                    />
                                </div>
                            </div>
                            {selectedPayment === 'paystack' && (
                                <div className="accordion-content bg-gray-100 p-4">
                                    <div className="flex justify-center items-center">
                                        <div className="w-[124.24px] h-[79.09] rounded-md flex justify-center items-center">
                                            <img src="/images/card.svg" alt="Browser" />
                                        </div>
                                    </div>
                                    <p className="text-center text-[14px] font-karla mt-4">
                                        After clicking “Pay now”, you will be redirected to Paystack to complete your
                                        purchase securely.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Bank Transfer Accordion */}
                        <div className="accordion-item border rounded-lg mb-4">
                            <div
                                className="accordion-header cursor-pointer p-4 flex justify-between items-center"
                                onClick={() => handleToggle('bank')}
                            >
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="bank"
                                        checked={selectedPayment === 'bank'}
                                        onChange={() => handleToggle('bank')}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-semibold text-[14px] font-karla">Bank Transfer</span>
                                </label>
                            </div>
                            {selectedPayment === 'bank' && (
                                <div className="accordion-content text-[14px] font-karla bg-gray-100 p-4">
                                    <p className='mb-5'>
                                        Please note that our conversion rate is 1,700 NGN to $1, and we will confirm all
                                        payments before processing your order.
                                    </p>
                                    <p className='mb-5'>Make a bank transfer in Nigerian Naira (NGN) to the required amount to the following account:</p>
                                    <p className="font-semibold mt-2 mb-5">
                                        Name: ASHCORP LUXURY PROJECTS LTD<br />
                                        Account Number: 1234567890
                                    </p>
                                    <p>Kindly contact +234(0) 707 285 5007 with your detailed proof of payment confirmation. Please note that we confirm all payments before processing orders.
                                        <br /><br />

                                        Thank you for your cooperation.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className='font-karla text-[16px] text-black'>Billing address</h1>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="text-sm mb-2">Country/Region</label>
                        <select id="country" className="p-4 border border-gray-300  rounded-md">
                            {products?.map((item: CountryProps) => (

                                <option value={item?.name} key={item?.code}>{item?.name}</option>
                            ))}
                            {/* Add more countries as needed */}
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="firstName" className="text-sm mb-2">First name</label>
                            <input type="text" id="firstName" placeholder="First name" className="p-4 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="lastName" className="text-sm mb-2">Last name</label>
                            <input type="text" id="lastName" placeholder="Last name" className="p-4 border border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="address" className="text-sm mb-2">Address</label>
                        <input type="text" id="address" placeholder="Address" className="p-4 border border-gray-300 rounded-md" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="city" className="text-sm mb-2">City</label>
                            <input type="text" id="city" placeholder="City" className="p-4 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="state" className="text-sm mb-2">State</label>
                            <select id="state" className="p-4 border border-gray-300 rounded-md">
                                <option value="Lagos">Lagos</option>
                                {/* Add more states */}
                            </select>
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-sm mb-2">Phone (optional)</label>
                        <input type="text" id="phone" placeholder="Phone (optional)" className="p-3 border border-gray-300 rounded-md" />
                    </div>
                    {/* Submit Button */}
                    {selectedPayment === 'paystack' && (
                        <div className="w-full text-center bg-black text-white py-4 rounded-md hover:bg-blue-600 mt-6"
                        >
                            <PaystackButton {...paystackProps} />
                        </div>
                    )}
                    {selectedPayment === 'bank' && (

                        <button
                            onClick={handleBankTransfer}
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-md hover:bg-blue-600 mt-6"
                        >
                            Place Order
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Cart Summary */}
            <div className="cart-summary p-6 bg-gray-50 py-16 border-l border-gray-200 rounded-md shadow-sm h-full overflow-auto">
                {cartItems.map((item) => (
                    <div key={item._id} className="cart-item flex items-center space-x-4 mb-4">
                        <img
                            src={item.img}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-lg"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-600">Price: ${item.price}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="font-semibold">
                                Total: ${(item.price * item.quantity).toFixed(2)} USD
                            </p>
                        </div>
                    </div>
                ))}

                {/* Subtotal and total calculation */}
                <div className="border-t pt-4 mt-4">
                    <p>
                        Subtotal: $
                        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} USD
                    </p>
                    <p>Pickup: Free</p>
                    <p className="font-semibold text-lg">
                        Total: $
                        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} USD
                    </p>
                </div>
            </div>
        </div>
    );
}
