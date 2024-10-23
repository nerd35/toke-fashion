import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface ProductData {
    newArrival: string;
    category?: string;       // e.g., "t-shirt"
    color?: string;          // e.g., "White"
    description: string;    // e.g., "Elite merchandise is a contemporary luxury Fashion brand..."
    discount: number;       // e.g., 0
    gender: string;         // e.g., "men"
    img: Array<{
      asset: SanityImageSource; url: string; alt?: string 
}>; // Array of image objects with optional alt text
    name: string;           // e.g., "Elitesmerch signature t-shirt (White)"
    price: number;          // e.g., 51.36
    size?: string[];         // e.g., ['S', 'M', 'L', 'XL']
    slug: { current: string; _type: string }; // e.g., { current: 'elitesmerch-signature-t-shirt-white', _type: 'slug' }
    _createdAt: string;     // ISO date string, e.g., "2024-10-20T12:59:42Z"
    _id: string;            // Unique identifier, e.g., "0111d792-2a73-46c7-85c2-18cc1512a0e4"
    features: string[]
    hot: string
  }

  // Define the OrderItem interface
interface OrderItem {
  id: string; // Unique identifier for the item
  name: string; // Name of the product
  description: string; // Description of the product
  quantity: number; // Quantity of the product ordered
  price: number; // Price of the product
  img: string; // URL of the product image
  color: string; // Color of the product
}

// Define the Order interface
export interface Order {
  id: string; // Unique identifier for the order
  userId: string; // User's unique identifier
  firstname: string; // First name of the user
  lastname: string; // Last name of the user
  email: string; // User's email address
  phone: string; // User's phone number
  address: string; // User's address
  city: string; // User's city
  state: string; // User's state
  country: string; // User's country
  paymentMethod: 'paystack' | 'bank'; // Payment method used
  totalAmount: number; // Total amount for the order
  status: 'pending' | 'success' | 'failed'; // Status of the order
  orderDetails: OrderItem[]; // Array of items in the order
}
  