"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage({ params }: { params: { _id: string } }) {
  const { cartItems } = useCart();
  const router = useRouter();

  // State to manage the user info and delivery method
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the user's info and delivery method here (e.g., send to an API)
    console.log("User Info:", userInfo);
    console.log("Delivery Method:", deliveryMethod);

    // Redirect to a confirmation page after submission
    router.push("/confirmation"); // Example redirection after form submission
  };

  return (
    <div className="checkout-page grid grid-cols-1 md:grid-cols-2  mt-16 mb-10 gap-6 p-6 h-screen">
      {/* Left: Checkout Form */}
      <div className="checkout-form p-6 py-16 rounded-md  h-full overflow-auto">
        <h1 className="text-xl font-semibold mb-4">Checkout</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* User Information */}
          <div className="user-info">
            <h2 className="text-lg font-semibold">User Info</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full mt-1"
                required
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full mt-1"
                required
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="text"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full mt-1"
                required
              />
            </label>
          </div>

          {/* Delivery Method */}
          <div className="delivery-method">
            <h2 className="text-lg font-semibold">Select Delivery Method</h2>
            <label className="block mb-2">
              <input
                type="radio"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="mr-2"
              />
              Pickup
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                value="onDelivery"
                checked={deliveryMethod === "onDelivery"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="mr-2"
              />
              Delivery on Order
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Confirm & Pay
          </button>
        </form>
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
              className=" rounded-lg"
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
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}{" "}
            USD
          </p>
          <p>Pickup: Free</p>
          <p className="font-semibold text-lg">
            Total: $
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}{" "}
            USD
          </p>
        </div>
      </div>
    </div>
  );
}
