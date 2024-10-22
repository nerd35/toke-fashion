import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: '73vn145o', // Your project ID
  dataset: 'production', // Dataset (e.g., 'production')
  apiVersion: '2022-03-07', // Use the current API version
  useCdn: true, // Set to false if you want fresh data
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Utility function for generating image URLs
export const urlFor = (source: any) => builder.image(source);
