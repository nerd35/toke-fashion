import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_KEY, // Your project ID
  dataset: process.env.NEXT_PUBLIC_DATASET, // Dataset (e.g., 'production')
  apiVersion: '2022-03-07', // Use the current API version
  useCdn: true, // Set to false if you want fresh data
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
export const urlForMany = (source: SanityImageSource | SanityImageSource[]) => {
  if (Array.isArray(source)) {
    return source.map(img => builder.image(img).url());
  }
  return builder.image(source).url();
};
