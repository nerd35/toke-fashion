"use client";

import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

interface BuyNowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  totalPrice: number;
  totalItems: number;
}

function BuyNow({ items }: BuyNowProps) {
  const { checkoutSingleItem, toggleCart } = useCart();
  const router = useRouter();

  function buyNow(productId: string) {
    const item = checkoutSingleItem(productId);
    if (item) {
      // Redirect to the checkout page with the product ID
      router.push(`/cn/${productId}`);
    }
  }

  return (
    <button
      onClick={() => {
        if (items.length > 0) {
          buyNow(items[0]._id);  // Redirect to checkout for the first item
        }
      }}
      className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-600"
    >
      Buy Now
    </button>
  );
}

export default BuyNow;
