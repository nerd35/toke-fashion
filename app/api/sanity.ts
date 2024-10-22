import { client } from "@/lib/sanity";

// Fetch all products
async function getData() {
    const query = "*[_type == 'product']";
    const data = await client.fetch(query);
    return data;
}

// Fetch product by slug
async function getDataBySlug(slug: string) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
        name,
        img,
        price,
        description,
        size,
        "slug": slug.current,
        category,
        discount,
        features,
        color,
        hot
    }`;
    
    const data = await client.fetch(query);
    return data;
}

// Fetch user by ID
async function getUserDataById(userId: string) {
    const query = `*[_type == "user" && _id == $userId][0]{
        _id,
        firstname,
        lastname,
        email,
        username,
        phonenumber,
        address,
        city,
        state,
        country
    }`;
    
    const params = { userId }; // Create parameters for the query
    const data = await client.fetch(query, params); // Pass parameters to the query
    return data; // Return the fetched user data
}

export {
    getData,
    getDataBySlug,
    getUserDataById // Export the new function
}
