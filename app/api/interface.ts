
export interface ProductData {
    category: string;       // e.g., "t-shirt"
    color: string;          // e.g., "White"
    description: string;    // e.g., "Elite merchandise is a contemporary luxury Fashion brand..."
    discount: number;       // e.g., 0
    gender: string;         // e.g., "men"
    img: Array<{ url: string; alt?: string }>; // Array of image objects with optional alt text
    name: string;           // e.g., "Elitesmerch signature t-shirt (White)"
    price: number;          // e.g., 51.36
    size: string[];         // e.g., ['S', 'M', 'L', 'XL']
    slug: { current: string; _type: string }; // e.g., { current: 'elitesmerch-signature-t-shirt-white', _type: 'slug' }
    _createdAt: string;     // ISO date string, e.g., "2024-10-20T12:59:42Z"
    _id: string;            // Unique identifier, e.g., "0111d792-2a73-46c7-85c2-18cc1512a0e4"
    features: any
    hot: string
  }
  